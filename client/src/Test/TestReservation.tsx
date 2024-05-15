import React, { useState } from 'react';

import useReservation from 'src/Hooks/useReservation';

export default function TestReservation() {
  const { data, loading, error, getReservation, createReservation, updateReservation, deleteReservation } = useReservation();

  const testcreatereservation = (e: any) => {
    e.preventDefault();
    createReservation({
      eventsPlaceId: '7sT3wcWqxnQP-',
      amenities: [
        {
          amenityId: '0Osi83bBc4sqJInjkMxG',
          quantity: 1
        },
        {
          amenityId: 'NCsbY3eycoOqtnnI-BZI',
          quantity: 1
        }
      ],
      guestCount: 1,
      startDate: new Date().getTime(),
      days: 1
    });
  }

  const testgetreservation = (e: any) => {
    e.preventDefault();
    getReservation({
      userType: 'renter',
      // reservationId: 'LWsev3rJc5BsTx6fgPNw',
      // eventsPlaceId: '7sT3wcWqxnQP-'
    });
  }

  return (
    <div>
      <h1>Create Reservation</h1>
      <form onSubmit={testcreatereservation}>
        <button type='submit'>Create Reservation</button>
      </form>
      <hr/>
      <h1>Get Reservation</h1>
      <form onSubmit={testgetreservation}>
        <button type='submit'>Get Reservation</button>
      </form>
    </div>
  );
}
