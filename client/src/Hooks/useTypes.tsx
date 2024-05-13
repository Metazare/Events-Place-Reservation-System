export interface AmenityType{
  id:string,
  name:string,
  amenityType: "oneTime" | "perDay" | "perQuantity",
  rate:number,
}
export interface ReviewType{
  id:string,
  eventsPlaceId:string,
  useId:string,
  reservationId:string,
  rating:number,
  comment:string,
  date:string,
}
export interface ReservationType{
  reservationId: string;
  renter: string;
  host: string;
  eventsPlace: string;
  amenities: AmenityType[];
  guestCount: number;
  date:Date[];
  status: {
    payment: "paid" | "unpaid";
    reservation: "pending" | "reserved" | "failed" | "canceled";
  };
}
