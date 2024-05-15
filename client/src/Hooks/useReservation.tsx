import { useState } from 'react';
import useRequest from './useRequest';

interface CreateReservationData {
  eventsPlaceId: string;
  amenities: {
      amenityId: string;
      quantity: number;
  }[];
  guestCount: number;
  startDate: number;
  days: number;
}

interface UpdateReservationData {
  
}

interface GetReservationData {
  userType: string;
  reservationId?: string;
  eventsPlaceId?: string;
}


function useReservation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getReservation = (content: GetReservationData) => {
    makeRequest({
      method: 'get',
      url: `/reservation/`+content.userType,
      params: content || {},
    });
  };

  const createReservation = (content: CreateReservationData) => {
    makeRequest({
      method: 'post',
      url: '/reservation',
      data: content,
    });
  };

  const updateReservation = (id: string, content: UpdateReservationData) => {
    makeRequest({
      method: 'patch',
      url: `/reservation/${id}`,
      data: content,
    });
  };

  const deleteReservation = (id: string) => {
    makeRequest({
      method: 'delete',
      url: `/reservation/${id}`,
    });
  };

  return {
    data,
    loading,
    error,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation,
  };
}

export default useReservation;
