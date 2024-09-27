import { Buffer } from 'buffer';
import envs from './envs';
import { BodyRequest, RequestHandler } from 'express';

enum APIMethod {
    POST = 'POST',
    GET = 'GET'
}

enum LinkPaymentStatus {
    UNPAID = 'unpaid',
    PAID = 'paid',
    REFUNDED = 'refunded',
    PARTIALLY_REFUNDED = 'partially_refunded',
    DISPUTED = 'disputed'
}

enum ResourceType {
    LINK = 'link',
    WEBHOOK = 'webhook'
}

interface Link {
    id: string;
    type: ResourceType;
    attributes: {
        amount: number;
        archived: boolean;
        currency: string;
        description: string;
        livemode: boolean;
        fee: number;
        remarks: string;
        status: LinkPaymentStatus;
        tax_amount: number;
        taxes: unknown[];
        checkout_url: string;
        reference_number: string;
        created_at: number;
        updated_at: number;
        payments: unknown[];
    };
}

interface Webhook {
    id: string;
    type: string;
    attributes: {
        type: string;
        livemode: boolean;
        data: Link;
        previous_data: unknown;
        created_at: number;
        updated_at: number;
    };
}

type RawLink = {
    data: Link;
}

type RawWebhook = {
    data: Webhook;
}

const authKey = Buffer.from(envs.PAYMONGO_SECRET_KEY).toString('base64');
const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Basic ${authKey}`
};

const createLink = async (amount: number, description: string): Promise<Link> => {
    const response = await fetch('https://api.paymongo.com/v1/links', {
        method: APIMethod.POST,
        headers,
        body: `{"data":{"attributes":{"amount":${amount * 100},"description":"${description}"}}}`
    });

    const responseJson: RawLink = await response.json();

    return responseJson.data;
};

const archieveLink = async (linkId: string) => {
    const response = await fetch(`https://api.paymongo.com/v1/links/${linkId}/archive`, {
        method: APIMethod.POST,
        headers
    });

    const responseJson: RawLink = await response.json();

    return responseJson.data;
};

export const paymongoWebhook: RequestHandler = async (req: BodyRequest<RawWebhook>, res) => {
    const { data } = req.body;

    console.log(data);

    console.log(JSON.stringify(data));

    res.sendStatus(200);
};

/**
 * TODO: Extract the id from the response. Store it to the reservation.
 * TODO: Add endpoint for paymongo webhook
 */
