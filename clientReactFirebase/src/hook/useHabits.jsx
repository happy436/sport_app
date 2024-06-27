import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/icon/Loader";
import {
	getHabitsLoadingStatus,
	loadHabitsList,
	getHabits,
    getHabitById,
} from "../store/habits";
import { getIsLoggedIn } from "../store/users";
import { getStartOfDayTimestamp } from "@utils/getStartOfDayTimestamp";

const HabitContext = createContext();

export const useHabit = () => {
	return useContext(HabitContext);
};

const HabitProvider = ({ children }) => {
	//! CONSTS
	const dispatch = useDispatch();

	//! SELECTORS
	const isLoading = useSelector(
		getHabitsLoadingStatus()
	);
	const isLoggedIn = useSelector(getIsLoggedIn());
	const habits = useSelector(getHabits());

	//! UTILS
	const getPercentCompleted = (num1, num2) => {
		const percent = (num1 * 100) / num2;
		return percent.toFixed(0);
	};

	const checkGoalsAchievedToday = (tasks) => {
		let achievedToday = 0;
		tasks.forEach((task) => {
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

	//! FUNCTIONS
	const loadHabits = () => dispatch(loadHabitsList());

	const handleChangeDate = (value) => {
		if (value !== undefined) {
			const timestamp = getStartOfDayTimestamp(value);
			setActiveDay(timestamp);
		}
	};

	const getHabitCompletionPercentage = (habit) => {
		const { history, goal } = habit;

		const data = history.filter((item) => {
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

	const getTodayHabitValue = (arr) => {
		const data = arr.filter((item) => {
			if (item.date === activeDay) {
				return item;
			}
		});

		return data.length > 0 ? data[0].value : 0;
	};

	//! STATES
	const [activeDay, setActiveDay] = useState(new Date().getTime());

	//* for home page
	const [achievements, setAchievements] = useState(0);
	const completedDayliAchievements = getPercentCompleted(
		achievements,
		habits.length
	);

	// useEffects
	useEffect(() => {
        console.log("useHabit init")
		setActiveDay(getStartOfDayTimestamp());
        console.log(isLoading && isLoggedIn)
	}, []);

	useEffect(() => {
        console.log("habits change")
		setAchievements(checkGoalsAchievedToday(habits));
	}, [habits]);

	useEffect(() => {
		if (isLoggedIn) {
            console.log("habits loading")
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
			{isLoading && !isLoggedIn ? <Loader /> : children }
		</HabitContext.Provider>
	);
};

export default HabitProvider;
