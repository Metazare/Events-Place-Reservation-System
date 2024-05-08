import React from 'react'

export default function useDates() {
  function getDatesToArray(startDate: Date, endDate: Date) {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  
  return {getDatesToArray}
}
