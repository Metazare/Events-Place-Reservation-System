import { cleanEnv } from 'envalid';
import { str, port } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 4000 }),
    CORS_ORIGIN: str(),
    JWT_ACCESS: str(),
    JWT_REFRESH: str(),
    JWT_RESET: str(),
    RESET_PASSWORD_UI_ENDPOINT: str(),
    MONGO_URI: str(),
    NODEMAILER_EMAIL: str(),
    NODEMAILER_PASSWORD: str()
});
