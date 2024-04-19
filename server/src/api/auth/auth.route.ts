import { checkEmail, login, logout, register, registerHost } from './auth.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.post('/login', asynchronousHandler(login));

router.post('/register', asynchronousHandler(register));

router.post('/checkemail', asynchronousHandler(checkEmail));

router.use(authenticate);

router.post('/register/host', asynchronousHandler(registerHost));

router.post('/logout', asynchronousHandler(logout));


export default router;
