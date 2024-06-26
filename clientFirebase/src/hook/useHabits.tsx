import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/icon/Loader";
import {
	getHabitsLoadingStatus,
	loadHabitsList,
	getHabits,
    Habit,
    HabitHistory,
} from "../store/habits";
import { getIsLoggedIn } from "../store/users";
import { getStartOfDayTimestamp } from "@/utils/getStartOfDayTimestamp";
import { RootState } from "../store/createStore";

// Define the type for the context
interface HabitContextType {
	getStartOfDayTimestamp: typeof getStartOfDayTimestamp;
	handleChangeDate: (value: any) => void;
	getHabitCompletionPercentage: (habit: any) => number;
	getTodayHabitValue: (arr: any[]) => number;
	habits: Habit[]; // Replace with actual type if possible
	activeDay: number;
	completedDayliAchievements: string;
	achievements: number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabit = () => {
	const context = useContext(HabitContext);
	if (!context) {
		throw new Error("useHabit must be used within a HabitProvider");
	}
	return context;
};

interface HabitProviderProps {
	children: React.ReactNode;
}

const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	//! CONSTS
	const dispatch = useDispatch();

	//! SELECTORS
	const isLoading = useSelector(
		getHabitsLoadingStatus()
	);
	const isLoggedIn = useSelector(getIsLoggedIn());
	const habits = useSelector(getHabits);

	//! UTILS
	const getPercentCompleted = (num1: number, num2: number): string => {
		const percent = (num1 * 100) / num2;
		return percent.toFixed(0);
	};

	const checkGoalsAchievedToday = (tasks: any[]): number => {
		let achievedToday = 0;
		tasks.forEach((task) => {
			let goalMet = false;
			task.history.forEach((record: any) => {
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

	//! FUNCTIONS
	const loadHabits = () => dispatch(loadHabitsList());

	const handleChangeDate = (value: any) => {
		if (value !== undefined) {
			const timestamp = getStartOfDayTimestamp(value);
			setActiveDay(timestamp);
		}
	};

	const getHabitCompletionPercentage = (habit: any): number => {
		const { history, goal } = habit;

		const data = history.filter((item: any) => {
			if (item.date === activeDay) {
				return item;
			}
		});
		if (data.length > 0) {
			return (Number(data[0].value) * 100) / Number(goal);
		} else {
			return 0;
		}
	};

	const getTodayHabitValue = (arr: HabitHistory[]): number => {
		const data = arr.filter((item: HabitHistory) => {
			if (item.date === activeDay) {
				return item;
			}
		});

		return data.length > 0 ? data[0].value : 0;
	};

	//! STATES
	const [activeDay, setActiveDay] = useState<number>(new Date().getTime());

	//* for home page
	const [achievements, setAchievements] = useState<number>(0);
	const completedDayliAchievements = getPercentCompleted(
		achievements,
		habits.length
	);

	// useEffects
	useEffect(() => {
		setActiveDay(getStartOfDayTimestamp());
	}, []);

	useEffect(() => {
		setAchievements(checkGoalsAchievedToday(habits));
	}, [habits]);

	useEffect(() => {
		if (isLoggedIn) {
			loadHabits();
		}
	}, [isLoggedIn]);

	return (
		<HabitContext.Provider
			value={{
				getStartOfDayTimestamp,
				handleChangeDate,
				getHabitCompletionPercentage,
				getTodayHabitValue,
				habits,
				activeDay,
				completedDayliAchievements,
				achievements,
			}}
		>
			{isLoading && isLoggedIn ? <Loader /> : children}
		</HabitContext.Provider>
	);
};

export default HabitProvider;
