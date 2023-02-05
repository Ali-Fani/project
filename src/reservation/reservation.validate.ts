import { z } from "zod";

export const reservationSchema = z.object({
	body: z.object({
		userId: z.number(),
		doctorId: z.number(),
	}),
});
