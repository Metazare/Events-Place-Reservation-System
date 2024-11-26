import { useEffect, useState } from "react";
import useEventsPlace from "./useEventsPlace";
import useReview from "./useReview";

function useReservation() {
    const {
        data: eventsPlace,
        loading,
        error,
        getEventsPlace,
    } = useEventsPlace();
    const { data: reviews, getReviews } = useReview();

    useEffect(() => {
        getEventsPlace();
        getReviews();
    }, []);

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

    const [top3Highest, setTop3Highest] = useState<string[]>([]);
    const getHighestRated = (data: any) => {
        if (!data || !reviews) return [];

        if (!eventsPlace) return [];

        const reviewsMap: {
            [key: string]: { totalRating: number; count: number };
        } = {};

        reviews.forEach((review: any) => {
            const placeId = review.eventsPlace.eventsPlaceId;
            if (reviewsMap[placeId]) {
                reviewsMap[placeId].totalRating += review.rating;
                reviewsMap[placeId].count++;
            } else {
                reviewsMap[placeId] = { totalRating: review.rating, count: 1 };
            }
        });

        const averageRatings = Object.keys(reviewsMap).map((placeId) => ({
            placeId,
            averageRating:
                reviewsMap[placeId].totalRating / reviewsMap[placeId].count,
        }));

        const sortedByRating = averageRatings.sort(
            (a, b) => b.averageRating - a.averageRating
        );
        const topThreeHighestRated = sortedByRating.slice(0, 3);

        const topThreeEventsPlace = eventsPlace.filter((place: any) =>
            topThreeHighestRated.some(
                (ratedPlace) => ratedPlace.placeId === place.eventsPlaceId
            )
        );

        setTop3Highest(topThreeEventsPlace);
        return topThreeEventsPlace;
    };

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

    const getMonthlySales = (data: any) => {
        if (!data) return 0;

        const reservations = data;
        let totalSales = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        reservations.map((reservation: any) => {
            const reservationDate = new Date(reservation.createdAt);
            if (
                reservation.amount &&
                reservationDate.getMonth() === currentMonth &&
                reservationDate.getFullYear() === currentYear
            ) {
                totalSales += reservation.amount;
            }
        });
        return totalSales;
    };

    const getWeeklySales = (data: any) => {
        if (!data) return 0;

        const reservations = data;
        let totalSales = 0;
        const currentDate = new Date();
        const currentWeekStart = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );
        const currentWeekEnd = new Date(
            currentDate.setDate(
                currentDate.getDate() - currentDate.getDay() + 6
            )
        );

        reservations.map((reservation: any) => {
            const reservationDate = new Date(reservation.createdAt);
            if (
                reservation.amount &&
                reservationDate >= currentWeekStart &&
                reservationDate <= currentWeekEnd
            ) {
                totalSales += reservation.amount;
            }
        });

        return totalSales;
    };

    return {
        top3Booked,
        getMostBooked,
        top3Highest,
        getTotalSales,
        getHighestRated,
        getMonthlySales,
        getWeeklySales,
    };
}

export default useReservation;
