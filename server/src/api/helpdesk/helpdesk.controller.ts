import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Conflict, NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import Helpdesk from './helpdesk.model';
import { HelpdeskDocument, GetHelpdeskEntry } from './helpdesk.types';

export const createHelpdeskReport: RequestHandler = async (req: BodyRequest<HelpdeskDocument>, res) => {
    const { eventsPlace, report} = req.body;

    if (!req.user) throw new Unauthorized();
    const user = req.user;

    const checker = new CheckData();
    checker.checkType(report, 'string', 'report');

    await Helpdesk.create({
        user: user._id,
        eventsPlace,
        report,
    });

    res.sendStatus(201);
};

export const createHelpdeskResponse: RequestHandler = async (req: BodyRequest<HelpdeskDocument>, res) => {
    const { id, response } = req.body;

    const checker = new CheckData();
    checker.checkType(id, 'string', 'id');

    const entry = await Helpdesk.findOne({ id }).exec();
    if (!entry) throw new NotFound('Helpdesk Entry');

    if (response) {
        checker.checkType(response, 'string', 'response');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);
        entry.response = response;
    }
    
    await entry.save();

    res.sendStatus(204);
};

export const getHelpdeskEntry: RequestHandler = async (req: QueryRequest<GetHelpdeskEntry>, res) => {

    if (!req.user) throw new Unauthorized();
    const user = req.user;

    const { id } = req.query;

    const helpdeskQuery: Record<string, unknown> = {};

    if (typeof id === 'string') helpdeskQuery.id = id;
    // if (role!=='admin') helpdeskQuery.userId = user._id;

    const entry = await Helpdesk.find(helpdeskQuery).exec();

    res.json(entry);
};
