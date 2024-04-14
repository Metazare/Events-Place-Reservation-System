import { BodyRequest, QueryRequest, RequestHandler } from "express";
import { CheckData } from "../../utilities/checkData";
import { EditUserCredentials, EditUserInfo, GetUser, UserDocument } from "./user.types";
import { Unauthorized, UnprocessableEntity } from "../../utilities/errors";
import UserModel from "./user.model";

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

