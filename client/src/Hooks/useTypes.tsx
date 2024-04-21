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