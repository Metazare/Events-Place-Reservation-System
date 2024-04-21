import { BodyRequest, RequestHandler } from 'express';
import { CreateReservation } from './reservation.types';

export const getReservations: RequestHandler = async (req, res) => {};

export const createReservation: RequestHandler = async (req: BodyRequest<CreateReservation>, res) => {};

export const updateReservationStatus: RequestHandler = async (req, res) => {};
