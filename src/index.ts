import { app } from "./app";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

http.createServer(app).listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
