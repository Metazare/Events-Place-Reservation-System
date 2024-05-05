import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { EditUserCredentials, EditUserInfo, ForgotPassword, GetUser, PasswordHashContent, ResetPassword, UserDocument } from './user.types';
import { id } from '../../utilities/ids';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { sendEmail } from '../../utilities/mailer';
import { sign, verify } from 'jsonwebtoken';
import envs from '../../utilities/envs';
import UserModel from './user.model';

export const getUsers: RequestHandler = async (req: QueryRequest<GetUser>, res) => {
    const { userId } = req.query;
    const checker = new CheckData();

    checker.checkType(userId, 'string', 'userId', true);
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const userQuery = userId == null ? {} : { userId };
    const users: UserDocument[] = await UserModel.find(userQuery).exec();

    res.json(users);
}

export const editInfo: RequestHandler = async (req: BodyRequest<EditUserInfo>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { firstName, middleName, lastName, suffixName, contact, photo, description, license } = body;

    user.name.first = firstName;
    user.name.middle = middleName;
    user.name.last = lastName;
    user.name.suffix = suffixName;
    user.contact = contact;
    user.photo = photo;
    user.description = description;
    user.license = license;

    await user.save();

    res.sendStatus(204);
}

export const editCredentials: RequestHandler = async (req: BodyRequest<EditUserCredentials>, res) => {
    const { user, body } = req;
    if (!user) throw new Unauthorized();

    const { email, password } = body;

    user.credentials.email = email;
    user.credentials.password = password;

    await user.save();

    res.sendStatus(204);
}

const hashMaxDue = 24 * 60 * 60 * 1000;
export const forgotPassword: RequestHandler = async (req: BodyRequest<ForgotPassword>, res) => {
    const { email } = req.body;

    // Find email
    const user: UserDocument | null = await UserModel.findOne({ 'credentials.email': email }).exec();
    if (!user) throw new NotFound('User');

    let passwordResetHash = user.credentials.passwordResetHash;

    // If password hash is not null
    //     If hash is past due, create new hash
    //     Otherwise, issue the same hash
    // Otherwise, create new hash
    if (passwordResetHash) {
        const content = verify(passwordResetHash, envs.JWT_RESET) as PasswordHashContent;
        const due = new Date(content.due);
        const difference = Date.now() - due.getTime();

        if (difference > 0) {
            passwordResetHash = sign(
                { hash: id(4), email: user.credentials.email, due: Date.now() + hashMaxDue },
                envs.JWT_RESET
            );
        }
    } else {
        passwordResetHash = sign(
            { hash: id(4), email: user.credentials.email, due: Date.now() + hashMaxDue },
            envs.JWT_RESET
        );
    }

    // Save the new hash to the user
    user.credentials.passwordResetHash = passwordResetHash;
    await user.save();

    await sendEmail({
        to: email,
        subject: 'Password Reset',
        content: `This is your reset link: ${envs.CORS_ORIGIN}/${envs.RESET_PASSWORD_UI_ENDPOINT}/${passwordResetHash}`
    });

    res.sendStatus(200);
}

export const resetPassword: RequestHandler = async (req: BodyRequest<ResetPassword>, res) => {
    const { password, hash } = req.body;
    const checker = new CheckData();

    checker.checkType(password, 'string', 'password');
    checker.checkType(hash, 'string', 'hash');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Verify the hash
    const content: PasswordHashContent = verify(hash, envs.JWT_RESET) as PasswordHashContent;

    // Check the date of the hash if still valid
    const due = new Date(content.due);
    const difference = Date.now() - due.getTime();

    if (difference > 0) {
        checker.addError('hash', 'Reset link is already expired');
        throw new UnprocessableEntity(checker.errors);
    }

    // Find user with the hash
    const user: UserDocument | null = await UserModel.findOne({ 'credentials.passwordResetHash': hash }).exec();
    if (!user) throw new NotFound('User');

    // Update the password of user
    user.credentials.password = password;

    // Reset password reset hash
    user.credentials.passwordResetHash = undefined;

    await user.save();

    res.sendStatus(204);
}

export const createAdminAccount = async () => {
    // Check if there is already saved admin account
    const user: UserDocument | null = await UserModel.findOne({ isAdmin: true }).exec();
    if (user) {
        return;
    }

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = envs;

    // If there is no admin account yet, create one
    await UserModel.create({
        name: {
            first: 'Admin',
            last: 'User'
        },
        credentials: {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        },
        isAdmin: true,
        contact: '09180566477'
    });
}
