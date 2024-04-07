import { useState } from 'react';
import useRequest from './useRequest';

interface HelpdeskData {
  id?: string;
  userId?: string;
  eventsPlaceId?: string;
  report?: string;
  response?: string;
}

function useHelpdesk() {
  const { data, loading, error, makeRequest } = useRequest();

  const getHelpdesk = (content: HelpdeskData) => {
    makeRequest({
      method: 'get',
      url: `/helpdesk`,
      params: content
    });
  };

  const createReport = (content: HelpdeskData) => {
    makeRequest({
      method: 'post',
      url: '/helpdesk/report',
      data: content,
    });
  };

  const createResponse = (content: HelpdeskData) => {
    makeRequest({
      method: 'post',
      url: '/helpdesk/respond',
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getHelpdesk,
    createReport,
    createResponse,
  };
}

export default useHelpdesk;
