import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/main.jsx";
import Home from "./pages/home/home.jsx";
import Habits from "./pages/habits/habits.jsx";
import HabitPage from "./pages/habits/habit.jsx";
import Measurements from "./pages/measurements/measurements.jsx";
import CreateHabit from "./pages/habits/createHabit/CreateHabit.jsx";
import LoginFactory from "./pages/login/loginFactory.jsx";
import HabitProvider from "./hook/useHabits.jsx";
import LogOut from "./pages/login/logOut.jsx";

function App() {
	const location = useLocation();
	return (
		<>
				<HabitProvider>
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<LoginFactory />} />
						<Route path="/" element={<MainPage />}>
							<Route path="home" element={<Home />} />
							<Route path="habits" element={<Habits />} />
							<Route
								path="habit/:id/:timestamp"
								element={<HabitPage />}
							/>
							<Route
								path="habit/createHabit"
								element={<CreateHabit />}
							/>
							<Route
								path="measurements"
								element={<Measurements />}
							/>
							<Route path="logOut" element={<LogOut />} />
						</Route>
					</Routes>
				</HabitProvider>
		</>
	);
}

export default App;
