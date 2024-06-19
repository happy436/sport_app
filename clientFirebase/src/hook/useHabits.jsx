import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/icon/Loader";
import { getHabitsLoadingStatus, loadHabitsList } from "../store/habits";
import { getIsLoggedIn } from "../store/users";

const HabitContext = createContext();

export const useHabit = () => {
	return useContext(HabitContext);
};

const HabitProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getHabitsLoadingStatus());
	const isLoggedIn = useSelector(getIsLoggedIn());
	const loadHabits = () => dispatch(loadHabitsList());
	useEffect(() => {
		if (isLoggedIn) {
			loadHabits();
		}
	}, [isLoggedIn]);
	return (
		<HabitContext.Provider value={{}}>
			{isLoading && isLoggedIn ? <Loader /> : children}
		</HabitContext.Provider>
	);
};

export default HabitProvider;
