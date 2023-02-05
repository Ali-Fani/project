import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { reservationRouter } from "./reservation/reservation.router";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/", (req, res, next) => {
	console.log(req.body);
	next();
});
app.use(reservationRouter);
