import { BodyRequest, RequestHandler } from 'express';
import { CreateEventsPlace } from './eventsPlace.types';
import { CheckData } from '../../utilities/checkData';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import eventsPlaceModel from './eventsPlace.model';

export const createEventsPlace: RequestHandler = async (req: BodyRequest<CreateEventsPlace>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = req.user;

    const { name, description, placeType, location, rate, maxCapacity, amenities, images } = req.body;
    const checker = new CheckData();

    /* Validation */

    checker.checkType(name, 'string', 'name');
    checker.checkType(description, 'string', 'desription');
    checker.checkType(placeType, 'string', 'placeType');
    checker.checkType(location, 'string', 'location');
    checker.checkType(rate, 'number', 'rate');
    checker.checkType(maxCapacity, 'number', 'maxCapacity');

    if (amenities instanceof Array) {
        for (let i = 0; i < amenities.length; i++) {
            const { name, amenityType, rate } = amenities[i];
            checker.checkType(name, 'string', `amenities.${i}.name`);
            checker.checkType(amenityType, 'string', `amenities.${i}.amenityType`);
            checker.checkType(rate, 'number', `amenities.${i}.rate`);
        }
    } else if (amenities != null) {
        checker.addError('amenities', `amenities is ${typeof amenities}`);
    }

    if (images instanceof Array) {
        for (let i = 0; i < images.length; i++) {
            checker.checkType(images[i], 'string', `images.${i}`);
        }
    } else if (images != null) {
        checker.addError('images', `images is ${typeof images}`);
    }

    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    /* Actual data processing */
    await eventsPlaceModel.create({
        host: user._id,
        name,
        description,
        placeType,
        location,
        rate,
        maxCapacity,
        amenities,
        images
    });

    res.sendStatus(201);
};

export const getEventsPlace: RequestHandler = async (req, res) => {};

export const updateEventsPlace: RequestHandler = async (req, res) => {};

export const deleteEventsPlace: RequestHandler = async (req, res) => {};
