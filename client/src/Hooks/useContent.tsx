import { useState } from 'react';
import useRequest from './useRequest';

interface ContentData {
  id?: string;
  title?: string;
  description?: string;
}

function useContent() {
  const { data, loading, error, makeRequest } = useRequest();

  const getContent = (id: string) => {
    makeRequest({
      method: 'get',
      url: `/content/${id}`,
    });
  };

  const createContent = (content: ContentData) => {
    makeRequest({
      method: 'post',
      url: '/content',
      data: content,
    });
  };

  const updateContent = (id: string, content: ContentData) => {
    makeRequest({
      method: 'patch',
      url: `/content/${id}`,
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

export default useContent;
