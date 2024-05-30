import { cancelReservation, createReservation, getReservationDates, getReservations, payReservation } from "./reservation.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.get('/:reservationUser', asynchronousHandler(getReservations));

router.get('/dates', asynchronousHandler(getReservationDates));

router.post('/', asynchronousHandler(createReservation));

router.patch('/pay', asynchronousHandler(payReservation));

router.patch('/cancel', asynchronousHandler(cancelReservation));

export default router;