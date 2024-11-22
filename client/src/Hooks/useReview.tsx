import { useState } from "react";
import useRequest from "./useRequest";

interface ReviewData {
    eventsPlaceId?: string;
    rating?: string;
    comment?: string;
}

function useReview() {
    const { data, loading, error, makeRequest } = useRequest();

    const getReview = (eventsPlaceId: string) => {
        makeRequest({
            method: "get",
            url: `/review${
                eventsPlaceId ? `?eventsPlaceId=${eventsPlaceId}` : ""
            }`,
        });
    };

    const getReviews = () => {
        makeRequest({
            method: "get",
            url: `/review`,
        });
    };

    const createReview = (review: ReviewData) => {
        makeRequest({
            method: "post",
            url: "/review",
            data: review,
        });
    };

    const getAverageRating = (reviews: any) => {
        if (reviews?.length === 0) return 0;
        const total = reviews?.reduce(
            (acc: number, review: any) => acc + review.rating,
            0
        );
        return total / reviews?.length;
    };

    return {
        data,
        loading,
        error,
        getReview,
        getReviews,
        createReview,
        getAverageRating,
    };
}

export default useReview;
