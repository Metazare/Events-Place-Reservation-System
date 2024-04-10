import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, Unauthorized } from '../utilities/errors';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Payload } from '../api/auth/auth.types';
import { RequestHandler } from 'express';
import { UserDocument, UserRole } from '../api/user/user.types';
import envs from '../utilities/envs';
import UserModel from '../api/user/user.model';

const refreshTime = 5 * 24 * 60 * 60 * 1000; // 5 days

const authenticate: RequestHandler = async (req, res, next) => {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } = req.cookies;

    if (!refreshToken) return next(new Unauthorized('This action requires logging in first'));

    let payload: Payload | undefined;

    try {
        payload = verify(accessToken, envs.JWT_ACCESS) as Payload;
    } catch (err) {}

    if (!payload) {
        try {
            const { userId, role, exp = new Date() } = verify(refreshToken, envs.JWT_REFRESH) as JwtPayload & Payload;
            payload = { userId, role };

            res.cookie('access-token', signAccess(payload), cookieOptions.access);

            if (Date.now() - new Date(exp).getTime() > refreshTime)
                res.cookie('refresh-token', signRefresh(payload), cookieOptions.refresh);
        } catch (err) {
            res.cookie('access-token', '', cookieOptions.default).cookie('refresh-token', '', cookieOptions.default);
            return next(err);
        }
    }

    if (payload) {
        let user: UserDocument | null;
        const { userId, role } = payload;

        switch (payload.role) {
            case UserRole.ADMIN:
                user = await UserModel.findOne({ adminId: userId }).exec();
                break;
            case UserRole.RENTER:
                user = await UserModel.findOne({ renterId: userId }).exec();
                break;
            case UserRole.HOST:
                user = await UserModel.findOne({ hostId: userId }).exec();
                break;
            default:
                return next(new Unauthorized('Invalid user role'));
        }

        if (!user) return next(new Forbidden());

        req.user = user;

        return next();
    }
};

export default authenticate;
