import express from "express";
import { validate } from "../middleware/validate";
import { reservationSchema } from "./reservation.validate";
import { createReservation } from "./reservation.controller";

export const reservationRouter = express.Router();

reservationRouter.post(
	"/getTicket",
	validate(reservationSchema),
	createReservation
);
