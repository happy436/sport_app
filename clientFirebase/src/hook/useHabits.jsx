import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/icon/Loader";
import {
	getHabitsLoadingStatus,
	loadHabitsList,
	getHabits,
} from "../store/habits";
import { getIsLoggedIn } from "../store/users";

const HabitContext = createContext();

export const useHabit = () => {
	return useContext(HabitContext);
};

const HabitProvider = ({ children }) => {
	//utils
	const getStartOfDayTimestamp = (date = Date.now()) => {
		const targetDate = new Date(date);
		const timestamp = new Date(targetDate.setHours(0, 0, 0, 0)).getTime();
		return timestamp;
	};

	const getPercentCompleted = (num1, num2) => {
		const percent = (num1 * 100) / num2;
		return percent.toFixed(0);
	}

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

	//consts
	const dispatch = useDispatch();

	//selectors
	const isLoading = useSelector(getHabitsLoadingStatus());
	const isLoggedIn = useSelector(getIsLoggedIn());
	const habits = useSelector(getHabits());

	//common functions
	const loadHabits = () => dispatch(loadHabitsList());

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
				habits,
				activeDay,
				completedDayliAchievements,
                achievements
			}}
		>
			{isLoading && isLoggedIn ? <Loader /> : children}
		</HabitContext.Provider>
	);
};

export default HabitProvider;
