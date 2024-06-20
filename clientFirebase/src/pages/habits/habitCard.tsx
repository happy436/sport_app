import { Card } from "@tremor/react";
import React, {useState, useEffect} from "react";
import { habitData } from "../home/home";
import { useHabit } from "../../hook/useHabits";

type HabitCardProps = {
	habit: habitData;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
	const { getHabitCompletionPercentage, getTodayHabitValue, activeDay } = useHabit();
    const [streak, setStreak] = useState(0)

    const calculateStreak = (habit:habitData, timestamp:number) => {
        //debugger
        const {history} = habit
        const time = 86400000
        const indexActiveDay = history.findIndex(item => item.date === timestamp)
        for(let i = indexActiveDay; i >= 0; i-- ){
            if(i === 0) return 0;

            if(history[i].date - time === history[i-1].date){
                if(history[i].value === Number(habit.goal)){
                    setStreak(prev => (prev+1))

                }
                if(history[i-1].value === Number(habit.goal)){
                    setStreak(prev => (prev+1))

                }
            }
        }
    }
    useEffect(()=>{
        calculateStreak(habit, activeDay)
    }, [activeDay])
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
				{/* <span className="text-xs absolute top-0 right-3">
                        🔥 1 Day
                        {calculateStreak(activeDay, habit)}
                    </span> */}
                    <span>{streak} Day</span>
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
