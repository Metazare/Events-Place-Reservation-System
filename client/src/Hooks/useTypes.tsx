export interface AmenityType{
  id:string,
  name:string,
  amenityType: "one time" | "per day" | "per quantity",
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