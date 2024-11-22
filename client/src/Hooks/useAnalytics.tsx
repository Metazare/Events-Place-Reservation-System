import { useEffect, useState } from "react";
import useEventsPlace from "./useEventsPlace";

function useReservation() {
    const {
        data: eventsPlace,
        loading,
        error,
        getEventsPlace,
    } = useEventsPlace();

    useEffect(() => {
        getEventsPlace();
    }, []);

    const getReservationTotal = (data: any) => {
        let total = 0;
        total += data.rate * data.days;

        data.amenities.forEach((amenity) => {
            if (amenity.amenityType === "per day") {
                total += data.days * amenity.rate;
            } else if (amenity.amenityType === "per quantity") {
                total += amenity.quantity * amenity.rate;
            } else if (amenity.amenityType === "one time") {
                total += amenity.rate;
            }
        });
        return total;
    };

    const [top3Booked, setTop3Booked] = useState<string[]>([]);

    const getMostBooked = async (data: any) => {
        await getEventsPlace();
        if (!data) return {};

        const reservations = data;
        const countMap: { [key: string]: number } = {};

        reservations.map((reservation: any) => {
            const placeId = reservation.eventsPlace.eventsPlaceId;
            if (countMap[placeId]) {
                countMap[placeId]++;
            } else {
                countMap[placeId] = 1;
            }
        });

        const sortedPlaces = Object.keys(countMap).sort(
            (a, b) => countMap[b] - countMap[a]
        );
        const topThreeMostBooked = sortedPlaces.slice(0, 3);

        const topThreeEventsPlace = eventsPlace.filter((place: any) =>
            topThreeMostBooked.includes(place.eventsPlaceId)
        );

        setTop3Booked(topThreeEventsPlace);
        return topThreeEventsPlace;
    };

    const getHighestRated = () => {};

    const getTotalSales = (data: any) => {
        if (!data) return 0;

        const reservations = data;
        let totalSales = 0;

        reservations.map((reservation: any) => {
            if (reservation.amount) {
                totalSales += reservation.amount;
            }
        });

        return totalSales;
    };

    return {
        getReservationTotal,
        top3Booked,
        getMostBooked,
        getTotalSales,
    };
}

export default useReservation;
