import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { Payload, RegisterUser } from './auth.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { User, UserRole } from '../user/user.types';
import UserModel from '../user/user.model';

export const register: RequestHandler = async (req: BodyRequest<RegisterUser>, res) => {
    const { role, email, password, firstName, middleName, lastName, suffixName, contact, photo, description, license } = req.body;

    const checker: CheckData = new CheckData();

    checker.checkType(role, 'string', 'role');
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
    if (middleName != null) checker.checkType(middleName, 'string', 'middleName');
    if (suffixName != null) checker.checkType(suffixName, 'string', 'suffixName');
    if (photo != null) checker.checkType(photo, 'string', 'photo');

    // If the role is host, check for the additional necessary info
    if (role === UserRole.HOST) {
        checker.checkType(description, 'string', 'description');
        checker.checkType(license, 'string', 'license');
    }

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
    }

    if (role === UserRole.HOST) {
        createUser.description = description;
        createUser.license = license;
    }

    // Create the user
    const user = await UserModel.create(createUser);
    const payload: Payload = { userId: user.userId, email: user.credentials.email };

    return res
        .cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(201);
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

export const checkEmail: RequestHandler = async (req, res) => {
    const { email } = req.body;

    const checkDuplicateEmail = await Promise.all([UserModel.exists({ 'credentials.email': email }).exec()]);

    res.json({ duplicateEmail: checkDuplicateEmail.find(Boolean) });
};

export const getUsers: RequestHandler = async (req: BodyRequest<User>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = req.user;

    const loggedInUserId = user._id;

    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.json(filteredUsers);
};


export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);
