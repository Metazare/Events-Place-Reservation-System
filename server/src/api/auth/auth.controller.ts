import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { Payload, RegisterHost, RegisterUser } from './auth.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { User, UserDocument } from '../user/user.types';
import UserModel from '../user/user.model';

export const register: RequestHandler = async (req: BodyRequest<RegisterUser>, res) => {
    const { email, password, firstName, middleName, lastName, suffixName, contact, photo } = req.body;

    const checker: CheckData = new CheckData();

    checker.checkType(email, 'string', 'email');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Check for duplicate email
    const checkDuplicateEmail = await UserModel.exists({ 'credentials.email': email }).exec();
    if (checkDuplicateEmail) {
        checker.addError('email', 'Duplicate email');
        throw new UnprocessableEntity(checker.errors);
    }

    // Validate user data
    checker.checkType(password, 'string', 'password');
    checker.checkType(firstName, 'string', 'firstName');
    checker.checkType(lastName, 'string', 'lastName');
    checker.checkType(contact, 'string', 'contact');
    checker.checkType(middleName, 'string', 'middleName', true);
    checker.checkType(suffixName, 'string', 'suffixName', true);
    checker.checkType(photo, 'string', 'photo', true);

    // Check if there are errors found by the checker
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Build the user
    const createUser: Omit<User, 'userId'> = {
        name: {
            first: firstName,
            middle: middleName,
            last: lastName,
            suffix: suffixName
        },
        credentials: { email, password },
        contact,
        photo
    };

    // Create the user
    const user = await UserModel.create(createUser);
    const payload: Payload = { userId: user.userId, email: user.credentials.email };

    return res
        .cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(201);
};

export const registerHost: RequestHandler = async (req: BodyRequest<RegisterHost>, res) => {
    const { user } = req;
    if (!user) throw new Unauthorized();

    // Check if user is already host
    if (user.license != null) throw new Unauthorized('Already a host');

    const { description, license } = req.body;
    const checker = new CheckData();

    checker.checkType(description, 'string', 'description');
    checker.checkType(license, 'string', 'license');

    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    user.description = description;
    user.license = license;
    await user.save();

    return res.sendStatus(201);
};

export const login: RequestHandler = async (req: BodyRequest<User['credentials']>, res) => {
    const { email, password } = req.body;
    const checker = new CheckData();

    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const user = await UserModel.findOne({ 'credentials.email': email }).exec();
    if (!user || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    const payload: Payload = { userId: user.userId, email: user.credentials.email };
    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json(user);
};

export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);

export const checkEmail: RequestHandler = async (req: BodyRequest<Pick<User['credentials'], 'email'>>, res) => {
    const emailExisting = await UserModel.exists({ 'credentials.email': req.body.email }).exec();
    res.json({ duplicateEmail: emailExisting != null });
};
