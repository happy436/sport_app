import { Card, Divider, ProgressCircle } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits } from "../../store/habits.js";
import { useHabit } from "../../hook/useHabits.jsx";
import ListCards from "./ListCards.js";
import DailyCard from "./DailyCard.js";

type profileProps = {};

export interface habitData {
	_id?: string;
	name: string;
	description: string;
	goal: number;
	units: string;
	icon: string;
	color: string;
	tags: string[];
	goalPeriod: string;
	reminderTime: string[];
	reminderMessage: string;
	showMemo: boolean;
	history: historyData[];
}

export interface historyData {
	value: number;
	date: number;
}

const Home: React.FC<profileProps> = () => {
	return (
		<>
			<div>
				<div>
					<h3 className="text-2xl">Actions</h3>
					<Divider></Divider>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						<DailyCard />
						<ListCards />
					</ul>
				</div>
			</div>
		</>
	);
};
export default Home;