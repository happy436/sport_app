import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits } from "../../store/habits";
import { Button, Card, DatePicker } from "@tremor/react";
import Page from "../../components/common/page";
import Calendar from "./Calendar";

export interface habitData {
	_id: string;
	name: string;
	description: string;
	value: number;
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

const Habits: React.FC = () => {
	// TODO custom hook
	const data: [] = useSelector(getHabits()) || [];
	/* const loadHabits = () => dispatch(loadHabitsList());
	useEffect(() => {
		loadHabits();
	}, []); */
	const [activeDay, setActiveDay] = useState(new Date().getTime());
	const handleChange = (value: number) => {
		if (value !== undefined) {
			const date = new Date(value);
			const timestamp = date.getTime();
			setActiveDay(timestamp);
		}
	};

	const getPercent = (habit: habitData, timestamp: number) => {
		const { history, goal } = habit;
		const date = new Date(timestamp);
		const startOfDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		const startOfDayTimestamp = startOfDay.getTime();

		const value = history.filter(
			(item: historyData) => item.date === startOfDayTimestamp
		)[0].value;
		return (Number(value) * 100) / Number(goal);
	};

	const giveTodayValue = (arr: historyData[], timestamp: number) => {
		const date = new Date(timestamp);
		const startOfDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		const startOfDayTimestamp = startOfDay.getTime();
		return arr.filter(
			(item: historyData) => item.date === startOfDayTimestamp
		)[0].value;
	};

	/* function calculateStreak(currentDate:number, data:habitData) {
		const startOfDay = new Date(
			new Date(currentDate).setHours(0, 0, 0, 0)
		).getTime();
        let streak = 0

        const {history, goal} = data

        const filteredData = history.filter((entry, index, array) => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            // TODO finished this function
            return false;
        });
    
        streak = filteredData.length;


		return streak > 0 ? `🔥 ${streak} Day${streak > 1 ? "s" : ""}` : "";
	} */

	return (
		<Page>
			<Page.PageTitle>Habits</Page.PageTitle>
			{/* TODO filter*/}
			<Page.PageContent>
				<section>
					<DatePicker
						onValueChange={handleChange}
						defaultValue={new Date(activeDay)}
					/>
				</section>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{data.length !== 0 ? (
						data.map((habit: habitData) => (
							<Link
								to={`/habit/${habit._id}`}
								key={habit._id}
								className="w-full"
							>
								<li className="">
									<Card
										decoration="top"
										decorationColor="indigo"
										className="text-white overflow-hidden relative"
									>
										<div
											className={`h-full absolute bg-indigo-500/25 left-0 top-0`}
											style={{
												width: `${getPercent(
													habit,
													activeDay
												)}%`,
											}}
										></div>
										{/* <span className="text-xs absolute top-0 right-3">
											🔥 1 Day
											{calculateStreak(activeDay, habit)}
										</span> */}
										<div className="flex gap-3 items-center w-full">
											<div className="h-full flex items-center text-2xl">
												{habit.icon}
											</div>
											<div className="flex justify-between items-center w-full">
												<div className="flex flex-col gap-1 items-start w-1/2">
													<span className="text-xl truncate w-full">
														{habit.name}
													</span>
													<span className="text-sm truncate w-full">
														{habit.description}
													</span>
												</div>
												<div className="flex">
													<span className="text-lg">
														{giveTodayValue(
															habit.history,
															activeDay
														)}{" "}
														/ {habit.goal}{" "}
														{habit.units}
													</span>
												</div>
											</div>
										</div>
									</Card>
								</li>
							</Link>
						))
					) : (
						<p className="text-2xl text-center">Empty</p>
					)}
				</ul>

				<Link to="/habit/createHabit" className="fixed bottom-10">
					<Button
						color="indigo"
						className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
					>
						+
					</Button>
				</Link>
			</Page.PageContent>
		</Page>
	);
};

export default Habits;
