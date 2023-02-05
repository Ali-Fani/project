import { db } from "../src/utils/db.server";

type Doctor = {
	id: number;
	name: string;
	capacity: number;
};

function getDoctors(): Array<Doctor> {
	return [{ id: 1, name: "Dr. House", capacity: 1000 }];
}

async function seed() {
	await Promise.all(
		getDoctors().map(async (doctor) => {
			return db.doctor.upsert({
				where: { id: doctor.id },
				create: {
					id: doctor.id,
					name: doctor.name,
					capacity: doctor.capacity,
				},
				update: {
					capacity: doctor.capacity,
				},
			});
		})
	);
}

seed();
