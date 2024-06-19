import { Card, Divider, ProgressCircle } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits } from "../store/habits.js";

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
	const [activeDay, setActiveDay] = useState(new Date().getTime());
	const [achievements, setAchievements] = useState(0);

	const cardList = [
		/* { url: "/measurements", name: "Measurements", color: "lime" }, */
		/*{ url: "/nutrition", name: "Nutrition", color: "yellow" }, */
	];
	const [habits, setHabits] = useState([]);
	const getData = useSelector(getHabits());

	useEffect(() => {
		setHabits(getData);
	}, []);

	useEffect(() => {
		setAchievements(checkGoalsAchievedToday(habits));
	}, [habits]);

	const checkGoalsAchievedToday = (tasks: habitData[]) => {
		let achievedToday = 0;
		tasks.forEach((task:habitData) => {
			let goalMet = false;
			task.history.forEach((record) => {
				if (record.date === activeDay) {
					if (record.value >= task.goal) {
						goalMet = true;
					}
				}
			});
			if (!goalMet) {
				if (0 >= task.goal) {
					goalMet = true;
				}
			}
			if (goalMet) {
				achievedToday++;
			}
		});
		return achievedToday;
	};

	const getPercentCompleted = (num1: number, num2: number) => {
		const percent = (num1 * 100) / num2;
		return percent.toFixed(0);
	};

	return (
		<>
			<div>
				<div>
					<h3 className="text-2xl">Actions</h3>
					<Divider></Divider>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						<li>
							<Link to="/habits">
								<Card
									className="mx-auto max-w-xs flex gap-3 hover:bg-slate-800"
									decoration="top"
									decorationColor="indigo"
								>
									{habits.length !== 0 ? (
										<>
											<ProgressCircle
												value={getPercentCompleted(
													achievements,
													habits.length
												)}
												size="md"
												color="indigo"
											>
												<span className="text-xs font-medium text-white">
													{getPercentCompleted(
														achievements,
														habits.length
													)}
													%
												</span>
											</ProgressCircle>
											<div>
												<p className="text-3xl font-bold text-white">
													Daily
												</p>
												<p className="text-slate-500">
													{achievements} /{" "}
													{habits.length} Complete
												</p>
											</div>
										</>
									) : (
										<p className="text-3xl font-bold text-white text-center w-full">
											Daily
										</p>
									)}
								</Card>
							</Link>
						</li>
						{cardList.map((card) => (
							<li key={card.name}>
								<Link to={card.url}>
									<Card
										className="mx-auto max-w-xs h-full flex items-center justify-center hover:bg-slate-800"
										decoration="top"
										decorationColor={card.color}
									>
										<p className="text-3xl text-white">
											{card.name}
										</p>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default Home;
