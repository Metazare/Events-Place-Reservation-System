import { Buffer } from 'buffer';
import envs from './envs';

enum APIMethod {
    POST = 'POST',
    GET = 'GET'
}

const authKey = Buffer.from(envs.PAYMONGO_SECRET_KEY).toString('base64');
const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Basic ${authKey}`
};

const createPaymongoLink = async (amount: number, description: string) => {
    const response = await fetch('https://api.paymongo.com/v1/links', {
        method: APIMethod.POST,
        headers,
        body: `{"data":{"attributes":{"amount":${amount * 100},"description":${description}}}}`
    });

    const responseJson = await response.json();

    return responseJson;
};

const archievePaymongoLink = async (linkId: string) => {
    const response = await fetch(`https://api.paymongo.com/v1/links/${linkId}/archive`, {
        method: APIMethod.POST,
        headers
    });

    const responseJson = await response.json();

    return responseJson;
};

export const createLink = async () => {

};

export const archieveLink = async () => {};

/**
 * TODO: Implement the following code. Provide CREATE LINK, ARCHIVE LINK - done
 * TODO: Extract the id from the response. Store it to the reservation.
 * TODO: Add endpoint for paymongo webhook
 */
