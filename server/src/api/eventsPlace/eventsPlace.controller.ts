import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import {
    CreateEventsPlace,
    EditEventsPlace,
    EventsPlaceDocument,
    EventsPlaceQuery,
    GetEventsPlace
} from './eventsPlace.types';
import { CheckData } from '../../utilities/checkData';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import eventsPlaceModel from './eventsPlace.model';
import { updateAmenities } from '../amenity/amenity.controller';
import { AmenityDocument, UpdateAmenity } from '../amenity/amenity.types';
import amenityModel from '../amenity/amenity.model';
import { logCreateEventsPlace } from '../log/log.controller';

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

    // Save the evente place
    const eventsPlace: EventsPlaceDocument = await eventsPlaceModel.create({
        host: user._id,
        name,
        description,
        placeType,
        location,
        rate,
        maxCapacity,
        images
    });

    if (amenities instanceof Array) {
        // Save the amenities
        await updateAmenities(eventsPlace, amenities as UpdateAmenity[]);
    }

    await logCreateEventsPlace(user.userId, eventsPlace.eventsPlaceId);

    res.json({ eventsPlaceId: eventsPlace.eventsPlaceId });
};

export const getEventsPlace: RequestHandler = async (req: QueryRequest<GetEventsPlace>, res) => {
    const { query } = req;
    const { eventsPlaceId } = query;

    const checker = new CheckData();
    checker.checkType(eventsPlaceId, 'string', 'eventsPlaceId', true);
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const eventsPlaceQuery: EventsPlaceQuery = {};

    if (eventsPlaceId) {
        eventsPlaceQuery.eventsPlaceId = eventsPlaceId;
    }

    const eventsPlaces: EventsPlaceDocument[] = await eventsPlaceModel.find(eventsPlaceQuery).populate('host').exec();

    // Create an array of promises for searching each of the events places' amenities
    const amenitySearches = eventsPlaces.map(
        (eventsPlace) =>
            new Promise(async (resolve) => {
                // Search the amenities of the events place
                const amenities: AmenityDocument[] = await amenityModel.find({ eventsPlace: eventsPlace._id }).exec();

                // Get only the necessary details of the amenities
                const eventsPlaceAmenities: Pick<AmenityDocument, 'amenityId' | 'name' | 'rate' | 'amenityType'>[] =
                    amenities.map((amenity) => ({
                        amenityId: amenity.amenityId,
                        name: amenity.name,
                        rate: amenity.rate,
                        amenityType: amenity.amenityType
                    }));

                // Resolve the events place with its amenities
                resolve({ ...eventsPlace.toJSON(), amenities: eventsPlaceAmenities });
            })
    );

    // Execute the searches concurrently
    const eventsPlacesWithAmenities = await Promise.all(amenitySearches);

    res.json(eventsPlacesWithAmenities);
};

export const editEventsPlace: RequestHandler = async (req: BodyRequest<EditEventsPlace>, res) => {
    const { user, body } = req;

    if (!user) throw new Unauthorized();
    const { eventsPlaceId, name, description, placeType, location, rate, maxCapacity, amenities, images } = body;
    const checker = new CheckData();

    // Find the events place by eventsPlaceId  and host
    const eventsPlace: EventsPlaceDocument | null = await eventsPlaceModel
        .findOne({ eventsPlaceId, host: user._id })
        .exec();
    if (!eventsPlace) throw new NotFound('Events Place');

    // Validate inputs

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

    // Update values
    eventsPlace.name = name;
    eventsPlace.description = description;
    eventsPlace.placeType = placeType;
    eventsPlace.location = location;
    eventsPlace.rate = rate;
    eventsPlace.maxCapacity = maxCapacity;
    eventsPlace.images = images;

    // Save changes
    await eventsPlace.save();

    // Update the amenities
    await updateAmenities(eventsPlace, amenities);

    res.sendStatus(204);
};
