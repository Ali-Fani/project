import { db } from "../utils/db.server";

type Reservation = {
	id: number;
	userId: number;
	doctorId: number;
};

export const getDoctorCapacity = async (doctorId: number): Promise<number> => {
	const doctor = await db.doctor.findUnique({
		where: {
			id: doctorId,
		},
		select: {
			capacity: true,
		},
	});
	return doctor?.capacity || 0;
};

export const createReservation = async (
	reservation: Omit<Reservation, "id">
): Promise<Reservation> => {
	const { userId, doctorId } = reservation;

	const createReservation = db.reservation.create({
		data: {
			userId,
			doctorId,
		},
		select: {
			id: true,
			userId: true,
			doctorId: true,
		},
	});
	const increaseDoctorCapacity = db.doctor.update({
		where: {
			id: doctorId,
		},
		data: {
			capacity: {
				decrement: 1,
			},
		},
	});
	const [reservationResult, doctor] = await db.$transaction([
		createReservation,
		increaseDoctorCapacity,
	]);
	return reservationResult;
};
