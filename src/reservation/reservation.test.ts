import { randomInt } from "crypto";
import { app } from "../app";
import request from "supertest";
import { db } from "../utils/db.server";
describe("POST /getTicket", () => {
	const userId = randomInt(1, 100);
	beforeAll(async () => {
		await db.doctor.update({ where: { id: 1 }, data: { capacity: 1 } });
	});
	afterAll(async () => {
		await db.reservation.deleteMany();
		await db.doctor.update({ where: { id: 1 }, data: { capacity: 10 } });
	});
	it("should create reservation", async () => {
		const response = await request(app)
			.post("/getTicket")
			.send({
				userId: userId,
				doctorId: 1,
			})
			.expect(201);
		expect(response.body.userId).toEqual(userId);
	});
	it("should't create reservation for user with reservation", async () => {
		const response = await request(app)
			.post("/getTicket")
			.send({
				userId: userId,
				doctorId: 1,
			})
			.expect(400);
		expect(response.body).not.toEqual({ userId: userId, doctorId: 1 });
	});
	it("should't create reservation for doctor with no capacity", async () => {
		const rand = randomInt(1, 100);
		const response = await request(app)
			.post("/getTicket")
			.send({
				userId: rand,
				doctorId: 1,
			})
			.expect(400);
		expect(response.body).not.toEqual({ userId: rand, doctorId: 1 });
	});
});
