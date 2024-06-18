import { Card } from "@tremor/react";
import React from "react";
import { habitData, historyData } from "../home";

type HabitCardProps = {
	habit: habitData;
	activeDay: number;
	getPercent: (habit: habitData, activeDay: number) => void;
	giveTodayValue: (arr: historyData[], activeDay: number) => number;
};

const HabitCard: React.FC<HabitCardProps> = ({
	habit,
	activeDay,
	getPercent,
	giveTodayValue,
}) => {
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
						width: `${getPercent(habit, activeDay)}%`,
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
								{giveTodayValue(habit.history, activeDay)} / {" "}
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
