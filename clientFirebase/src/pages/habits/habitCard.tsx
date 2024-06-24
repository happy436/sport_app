import { Card } from "@tremor/react";
import React, { useState, useEffect } from "react";
import { habitData } from "../home/home";
import { useHabit } from "../../hook/useHabits";

type HabitCardProps = {
	habit: habitData;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
	const { getHabitCompletionPercentage, getTodayHabitValue, activeDay } =
		useHabit();
	const [streak, setStreak] = useState(0);
	const calculateStreak = (habit: habitData, activeDay: number) => {
		setStreak(0);

        const notSortedHistory = [...habit.history!]
		const history = notSortedHistory.sort((a,b) => (a.date - b.date))

		const goal = habit.goal
		let streak = 0;
		const currentDayIndex = history.findIndex(
			(entry) => entry.date === activeDay
		);

		if (currentDayIndex === -1) {
			return streak;
		}

		if (history[currentDayIndex].value === goal) {
			streak = 1;
		} else {
			return streak;
		}

		for (let i = currentDayIndex - 1; i >= 0; i--) {
			const currentDate = history[i + 1].date;
			//console.log("curr", new Date(currentDate));
			const previousDate = history[i].date;
			//console.log("prev", new Date(previousDate));
			const condition1 =
				currentDate - 1000 * 60 * 60 * 24 === previousDate;
			const condition2 = history[i].value === goal;
			if (condition1 && condition2) {
				streak++;
			} else {
				break;
			}
		}

		setStreak(streak);
	};

	useEffect(() => {
		calculateStreak(habit, activeDay);
	}, [activeDay]);

	const StreakDisplay = () => {
		if (streak === 0) return null;
		return (
			<span className="text-xs absolute top-0 right-3">
				{`🔥 ${streak} Day${streak === 1 ? "" : "s"}`}
			</span>
		);
	};
	return (
		<li className="">
			<Card
				decoration="top"
				decorationColor={habit.color}
				className="text-white overflow-hidden relative"
			>
				<div
					className={`h-full absolute bg-indigo-500/25 left-0 top-0`}
					style={{
						width: `${getHabitCompletionPercentage(habit)}%`,
					}}
				></div>
				{StreakDisplay()}
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
								{getTodayHabitValue(habit.history)} /{" "}
								{habit.goal} {habit.units}
							</span>
						</div>
					</div>
				</div>
			</Card>
		</li>
	);
};
export default HabitCard;
