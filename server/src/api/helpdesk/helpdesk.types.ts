export interface HelpdeskDocument extends Document {
  id: string;
  userId: string;
  eventsPlaceId: string;
  report: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GetHelpdeskEntry = {
  id?: string;
  userId?: string;
};