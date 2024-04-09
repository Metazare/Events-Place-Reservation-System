import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { Payload, Role, UserLogin, UserRegister } from './auth.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import UserModel from '../user/user.model';
import {User} from '../user/user.types';
import { RegisterUser, CheckEmail, UpdateUser, LoginUser } from '../user/user.types';

export const getUsers: RequestHandler = async (req: BodyRequest<User>, res) => {
	if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const loggedInUserId = user._id;

    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.json(filteredUsers);
};

export const createUser = async (body: RegisterUser): Promise<Payload> => {
    const {
      firstName,
      lastName,
      credentials: { email, password },
      contact,
    } = body;

    let { middleName } = body;

    const checker = new CheckData();
  
    checker.checkType(firstName, 'string', 'firstName');
    checker.checkType(lastName, 'string', 'lastName');
    checker.checkType(contact, 'number', 'contact');
    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (middleName) checker.checkType(middleName, 'string', 'middleName');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);
  
    const { id } = await UserModel.create({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        contact,
        credentials: { email, password }
    });

    return { userId: id, role: Role.RENTER };
  };

export const register: RequestHandler = async (req: BodyRequest<UserRegister>, res) => {
    const { role, ...body } = req.body;
    const { credentials: { email, password } } = body;

    const checker: CheckData = new CheckData();

    checker.checkType(role, 'string', 'role');
    checker.checkType(email, 'string', 'email');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const checkDuplicateEmail = await Promise.all([
        UserModel.exists({ 'credentials.email': email }).exec(),
    ]);
    
    if (checkDuplicateEmail.find(Boolean)) {
        checker.addError('email', 'Duplicate email');
        throw new UnprocessableEntity(checker.errors);
    }

    let payload: Payload;

    payload = await createUser(<RegisterUser>body);

    return res
        .cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(201);
};

export const login: RequestHandler = async (req: BodyRequest<LoginUser>, res) => {
    const { email, password} = req.body;
    const checker = new CheckData();

    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const findUser = await Promise.all([
        UserModel.findOne({ 'credentials.email': email }).exec()
    ]);

    const user = findUser.find(Boolean);
    if (!user || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    let payload: Payload;

    if (user instanceof UserModel) payload = { userId: user.id, role: Role.ADMIN };
    else throw new Unauthorized();

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json({ ...user.toJSON(), role: payload.role });
};

export const checkEmail: RequestHandler = async (req, res) => {
    const { email } = req.body;

    const checkDuplicateEmail = await Promise.all([
        UserModel.exists({ 'credentials.email': email }).exec(),
    ]);

    res.json({ duplicateEmail: checkDuplicateEmail.find(Boolean) });
}

export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);
