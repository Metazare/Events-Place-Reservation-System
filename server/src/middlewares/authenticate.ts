import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, Unauthorized } from '../utilities/errors';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Payload } from '../api/auth/auth.types';
import { RequestHandler } from 'express';
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
            const { userId, email, exp = new Date() } = verify(refreshToken, envs.JWT_REFRESH) as JwtPayload & Payload;
            payload = { userId, email };

            res.cookie('access-token', signAccess(payload), cookieOptions.access);

            if (Date.now() - new Date(exp).getTime() > refreshTime)
                res.cookie('refresh-token', signRefresh(payload), cookieOptions.refresh);
        } catch (err) {
            res.cookie('access-token', '', cookieOptions.default).cookie('refresh-token', '', cookieOptions.default);
            return next(err);
        }
    }

    if (payload) {
        const { userId, email } = payload;
        const user = await UserModel.findOne({ userId, 'credentials.email': email });

        if (!user) return next(new Forbidden());

        req.user = user;

        return next();
    }
};

export default authenticate;
