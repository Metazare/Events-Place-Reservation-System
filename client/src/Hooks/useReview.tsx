import { useState } from 'react';
import useRequest from './useRequest';

interface ReviewData {
  eventsPlaceId?: string;
  rating?: string;
  comment?: string;
}

function useReview() {
  const { data, loading, error, makeRequest } = useRequest();

  const getReview = (eventsPlaceId: string, reviewId:string) => {
    makeRequest({
      method: 'get',
      url: `/review${eventsPlaceId ? `?eventsPlaceId=${eventsPlaceId}` : ''}${reviewId ? `?reviewId=${reviewId}` : ''}`,
    });
  };

  const createReview = (review: ReviewData) => {
    makeRequest({
      method: 'post',
      url: '/review',
      data: review,
    });
  };

  return {
    data,
    loading,
    error,
    getReview,
    createReview
  };
}

export default useReview;
