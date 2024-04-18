import { EventsPlaceDocument } from '../eventsPlace/eventsPlace.types';
import amenityModel from './amenity.model';
import { AmenityDocument, AmenityState, UpdateAmenity } from './amenity.types';

export const updateAmenities = async (eventsPlace: EventsPlaceDocument, amenities: UpdateAmenity[]) => {
    // Find amenities of the events place
    const eventsPlaceAmenities: AmenityDocument[] = await amenityModel.find({ eventsPlace: eventsPlace._id }).exec();

    // Separate the amenities
    for (const eventsplaceAmenity of eventsPlaceAmenities) {
        // Check if the amenity is in the update amenities
        const amenityIndex = amenities.findIndex(
            (updateAmenity) => eventsplaceAmenity.amenityId === updateAmenity.amenityId
        );
        const foundAmenity = amenities[amenityIndex];

        if (amenityIndex !== -1) {
            // Update the amenity
            eventsplaceAmenity.name = foundAmenity.name;
            eventsplaceAmenity.amenityType = foundAmenity.amenityType;
            eventsplaceAmenity.rate = foundAmenity.rate;

            // Remove the amenity to the amenities
            amenities.splice(amenityIndex, 1);
        } else {
            eventsplaceAmenity.state = AmenityState.INACTIVE
        }
    }

    // Save changes
    await Promise.all(eventsPlaceAmenities.map(a => a.save()));

    // Add the raw amenities (if any)
    for (const amenity of amenities) {
        await amenityModel.create({
            ...amenity,
            eventsPlace: eventsPlace._id
        });
    }
};
