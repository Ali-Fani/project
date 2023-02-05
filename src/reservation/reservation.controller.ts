import { Request, Response } from "express";
import * as ReservationService from "./reservation.service";

export const createReservation = async (
	request: Request,
	response: Response
) => {
	console.log(request.body);
	try {
		const doctorCapacity = await ReservationService.getDoctorCapacity(1);
		if (doctorCapacity === 0) {
			return response
				.status(400)
				.json({ error: "Doctor is not available" });
		}
		const reservation = await ReservationService.createReservation({
			userId: request.body.userId,
			doctorId: request.body.doctorId,
		});
		return response.status(201).json(reservation);
	} catch (error: any) {
		if (error.code === "P2002") {
			return response
				.status(400)
				.json({ error: "User already has a reservation" });
		}
		if (error.code === "P2003") {
			return response
				.status(400)
				.json({ error: "Doctor does not exist" });
		}
		console.log(error);
		return response.status(500).send(error.message);
	}
};
