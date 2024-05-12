import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import router from "./routes/index.js";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);

async function start() {
	try {
		app.listen(PORT, () => {
			console.log(
				chalk.green(`Server has been started on port ${PORT}...`)
			);
		});
	} catch (e) {
		console.log(chalk.red(e.message));
		process.exit(1);
	}
}

start();