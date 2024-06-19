import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/main";
import Home from "./pages/home/home.tsx";
import Habits from "./pages/habits/habits";
import Habit from "./pages/habits/habit";
import Measurements from "./pages/measurements/measurements.tsx";
import CreateHabit from "./pages/habits/createHabit/CreateHabit.tsx";
import LoginFactory from "./pages/login/loginFactory.tsx";
import HabitProvider from "./hook/useHabits";
import LogOut from "./pages/login/logOut.tsx";

function App() {
	const location = useLocation();
	return (
		<>
			<HabitProvider>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<LoginFactory />} />
					<Route path="/*" element={<MainPage />}>
						<Route path="home" element={<Home />} />
						<Route path="habits" element={<Habits />} />
						<Route
							path="habit/:id/:timestamp"
							element={<Habit />}
						/>
						<Route
							path="habit/createHabit"
							element={<CreateHabit />}
						/>
						<Route path="measurements" element={<Measurements />} />
						<Route path="logOut" element={<LogOut />} />
					</Route>
				</Routes>
			</HabitProvider>
		</>
	);
}

export default App;
