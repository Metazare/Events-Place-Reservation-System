import { useState } from 'react';
import useRequest from './useRequest';

interface EventsPlaceData {
  id?: string;
  title?: string;
  description?: string;
}

function useEventsPlace() {
  const { data, loading, error, makeRequest } = useRequest();

  const getEventsPlace = (id: string) => {
    makeRequest({
      method: 'get',
      url: `/eventsplace/${id}`,
    });
  };

  const createEventsPlace = (content: EventsPlaceData) => {
    makeRequest({
      method: 'post',
      url: '/eventsplace',
      data: content,
    });
  };

  const updateEventsPlace = (id: string, content: EventsPlaceData) => {
    makeRequest({
      method: 'patch',
      url: `/eventsplace/${id}`,
      data: content,
    });
  };

  const deleteEventsPlace= (id: string) => {
    makeRequest({
      method: 'delete',
      url: `/eventsplace/${id}`,
    });
  };

  return {
    data,
    loading,
    error,
    getEventsPlace,
    createEventsPlace,
    updateEventsPlace,
    deleteEventsPlace,
  };
}

export default useEventsPlace;
