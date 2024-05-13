import { ReservationType } from "./useTypes"

const SampleDate = new Date();
export const SampleReservation:ReservationType[] = [
  {
    reservationId: "1",
    renter: "1",
    host: "1",
    eventsPlace: "1",
    amenities: [],
    guestCount: 1,
    date: [SampleDate],
    status: {
      payment: "paid",
      reservation: "reserved",
    },
  },
  {
    reservationId: "2",
    renter: "2",
    host: "2",
    eventsPlace: "2",
    amenities: [],
    guestCount: 1,
    date: [SampleDate],
    status: {
      payment: "paid",
      reservation: "reserved",
    },
  },
  {
    reservationId: "3",
    renter: "3",
    host: "3",
    eventsPlace: "3",
    amenities: [],
    guestCount: 1,
    date: [SampleDate],
    status: {
      payment: "paid",
      reservation: "reserved",
    },
  },
]