import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits, loadHabitsList } from "../../store/habits.js";
import { Button, DatePicker, DatePickerValue } from "@tremor/react";
import Page from "../../components/common/page";
import { habitData, historyData } from "../home";
import HabitCard from "./habitCard";

const Habits: React.FC = () => {
	// TODO custom hook
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
	const loadHabits = () => dispatch(loadHabitsList());
    const getData = useSelector(getHabits());
	const [activeDay, setActiveDay] = useState(0);
	useEffect(() => {
        loadHabits();
		const today = Date.now();
		const timestamp = new Date(
			new Date(today).setHours(0, 0, 0, 0)
		).getTime();
		setActiveDay(timestamp);
	}, []);
    useEffect(() => {
        setData(getData);
    }, [getData])
	const handleChange = (value: DatePickerValue) => {
		if (value !== undefined) {
			const date = new Date(value);
			const timestamp = date.getTime();
			setActiveDay(timestamp);
		}
	};

	const getPercent = (habit: habitData, timestamp: number):number => {
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

	const giveTodayValue = (arr: historyData[], timestamp: number): number => {
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

				{data.length !== 0 ? (
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{data.map((habit: habitData) => (
							<Link
								to={`/habit/${habit._id}/${activeDay}`}
								key={habit._id}
								className="w-full"
							>
								<HabitCard
									habit={habit}
									activeDay={activeDay}
									getPercent={getPercent}
									giveTodayValue={giveTodayValue}
								/>
							</Link>
						))}
					</ul>
				) : (
					<p className="text-2xl text-center">Empty</p>
				)}

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
