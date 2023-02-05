import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

export const validate =
	(schema: AnyZodObject) =>
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: request.body,
				query: request.query,
				params: request.params,
			});
			return next();
		} catch (error: any) {
			return response.status(400).json(error);
		}
	};
