import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits } from "../../store/habits";
import { Button, Card, DatePicker } from "@tremor/react";
import Page from "../../components/common/page";
import { habitData, historyData } from "../home";

const Habits: React.FC = () => {
	// TODO custom hook
	const getData = useSelector(getHabits());
	/* const loadHabits = () => dispatch(loadHabitsList());
	useEffect(() => {
		loadHabits();
	}, []); */
	const [data, setData] = useState([]);
	const [activeDay, setActiveDay] = useState(0);
	useEffect(() => {
		setData(getData);
		const today = Date.now();
		const timestamp = new Date(
			new Date(today).setHours(0, 0, 0, 0)
		).getTime();
		setActiveDay(timestamp);
	}, []);
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

		const data = history.filter((item: historyData) => {
			if (item.date === startOfDayTimestamp) {
				return item;
			}
		});
		if (data.length > 0) {
			return (Number(data[0].value) * 100) / Number(goal);
		} else {
			return 0;
		}
	};

	const giveTodayValue = (arr: historyData[], timestamp: number) => {
		const date = new Date(timestamp);
		const startOfDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		const startOfDayTimestamp = startOfDay.getTime();
		const data = arr.filter((item: historyData) => {
			if (item.date === startOfDayTimestamp) {
				return item;
			}
		});

		return data.length > 0 ? data[0].value : 0;
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
					{activeDay !== 0 && (
						<DatePicker
							onValueChange={handleChange}
							defaultValue={new Date(activeDay)}
						/>
					)}
				</section>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{data.length !== 0 ? (
						data.map((habit: habitData) => (
							<Link
								to={`/habit/${habit._id}/${activeDay}`}
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
