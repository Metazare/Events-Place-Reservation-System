import { useState } from 'react';
import useRequest from './useRequest';
import axios from './useAxios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CreateReservationData {
  eventsPlaceId: string;
  amenities: {
      amenityId: string;
      quantity: number;
      rate?: number;
  }[];
  guestCount: number;
  startDate: number;
  days: number;
}

interface ReservationData {
  eventsPlaceId: string;
  eventsPlace?: {
    rate: number;
  }
  duration?:{
    start: Date;
    end: Date;
  }
  rate: number;
  amenities: {
      amenityId: string;
      quantity: number;
      rate: number;
      amenityType: string;
  }[];
  guestCount: number;
  startDate: number;
  days: number;
}

interface Reservation {
  reservationId: string;
}

interface GetReservationData {
  userType: string;
  reservationId?: string;
  eventsPlaceId?: string;
}


function useReservation() {
  const { data, loading, error, makeRequest } = useRequest();
  const navigate = useNavigate();

  const getReservation = (content: GetReservationData) => {
    makeRequest({
      method: 'get',
      url: `/reservation/`+content.userType,
      params: content || {},
    });
  };

  const createReservation = async (content: CreateReservationData) => {
    try {
      await axios.post('/reservation', content)
        .then((response) => {  
          toast.success("Reservation set!");
          navigate('/invoice/'+response.data.reservationId);
        });
    } 
    catch (error: any) {
      console.error('Error making request:', error);
      toast.error(error.response.data.message);
    }
  };

  const payReservation = (content: Reservation) => {
    makeRequest({
      method: 'patch',
      url: `/reservation/pay`,
      data: content,
    });
  };

  const cancelReservation = (content: Reservation) => {
    makeRequest({
      method: 'patch',
      url: `/reservation/cancel`,
      data: content,
    });
  };

  const deleteReservation = (id: string) => {
    makeRequest({
      method: 'delete',
      url: `/reservation/${id}`,
    });
  };

  const getReservationTotal = (data: ReservationData) => {
    let total = 0;
      total += data.rate * data.days;

    data.amenities.forEach((amenity) => {
      if (amenity.amenityType === 'per day') {
        total += data.days * amenity.rate;
      }
      else if (amenity.amenityType === 'per quantity') {
        total += amenity.quantity * amenity.rate;
      }
      else if (amenity.amenityType === 'one time') {
        total += amenity.rate;
      }

    });
    return total;
  };

  return {
    data,
    loading,
    error,
    getReservation,
    createReservation,
    payReservation,
    cancelReservation,
    deleteReservation,
    getReservationTotal
  };
}

export default useReservation;
