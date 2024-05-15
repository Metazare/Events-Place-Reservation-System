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

  return (
    <div>
      <h1>Create Report</h1>
      <form onSubmit={testcreatereservation}>
        {/* <input type='text' placeholder='report' onChange={(e: any) => setReport(e.target.value)}/> */}
        <button type='submit'>Create Reservation</button>
      </form>
    </div>
  );
}
