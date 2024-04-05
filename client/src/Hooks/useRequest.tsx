import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface RequestData {
  data: any;
  loading: boolean;
  error: Error | null;
}

interface RequestConfig extends AxiosRequestConfig {
  url: string;
}

interface RequestHook extends RequestData {
  makeRequest: (config: RequestConfig) => void;
}

function useRequest(): RequestHook {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const makeRequest = async (config: RequestConfig) => {
    setLoading(true);
    try {
      const response = await axios(config);
      setData(response.data);
      alert("Request Successful!"); // Modify this based on your needs
    } catch (error: any) {
      setError(error);
      console.error('Error making request:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeRequest };
}

export default useRequest;
