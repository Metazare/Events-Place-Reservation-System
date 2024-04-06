import { useState } from 'react';
import useRequest from './useRequest';

interface ReservationData {
  id?: string;
  renterId?: string;
  hostId?: string;
  eventsPlaceId?: string;
  status?: string;
  timestamp?: string;
}

function useReservation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getReservation = (content: ReservationData) => {
    makeRequest({
      method: 'get',
      url: `/reservation`,
      params: content || {},
    });
  };

  const createReservation = (content: ReservationData) => {
    makeRequest({
      method: 'post',
      url: '/reservation',
      data: content,
    });
  };

  const updateReservation = (id: string, content: ReservationData) => {
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
