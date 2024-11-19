export type Payload = {
    userId: string;
    email: string;
};
 
export type RegisterUser = {
    email: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffixName?: string;
    contact: string;
    photo?: string;
};

export type RegisterHost = {
    description: string;
    license: string;
};

export type RegisterHostDirect = {
    email: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffixName?: string;
    contact: string;
    photo?: string;
    description: string;
    license: string;
};