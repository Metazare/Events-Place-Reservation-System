import { cancelReservation, createReservation, getReservations, payReservation } from "./reservation.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get('/', asynchronousHandler(getReservations));

router.use(authenticate);

router.post('/', asynchronousHandler(createReservation));

router.patch('/pay', asynchronousHandler(payReservation));

router.patch('/cancel', asynchronousHandler(cancelReservation));

export default router;