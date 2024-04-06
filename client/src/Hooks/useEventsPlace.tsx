import { useState } from 'react';
import useRequest from './useRequest';

interface EventsPlaceData {
  id?: string;
  title?: string;
  description?: string;
}

function useEventsPlace() {
  const { data, loading, error, makeRequest } = useRequest();

  const getContent = (id: string) => {
    makeRequest({
      method: 'get',
      url: `/eventsplace/${id}`,
    });
  };

  const createContent = (content: EventsPlaceData) => {
    makeRequest({
      method: 'post',
      url: '/eventsplace',
      data: content,
    });
  };

  const updateContent = (id: string, content: EventsPlaceData) => {
    makeRequest({
      method: 'patch',
      url: `/eventsplace/${id}`,
      data: content,
    });
  };

  const deleteContent = (id: string) => {
    makeRequest({
      method: 'delete',
      url: `/content/${id}`,
    });
  };

  return {
    data,
    loading,
    error,
    getContent,
    createContent,
    updateContent,
    deleteContent,
  };
}

export default useEventsPlace;
