import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/main";
import Home from "./pages/home";
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
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<LoginFactory />} />
				<Route path="/*" element={<MainPage />}>
					<Route
						path="home"
						element={
							<HabitProvider>
								<Home />
							</HabitProvider>
						}
					/>
					<Route
						path="habits"
						element={
							<HabitProvider>
								<Habits />
							</HabitProvider>
						}
					/>
					<Route
						path="habit/:id/:timestamp"
						element={
							<HabitProvider>
								<Habit />
							</HabitProvider>
						}
					/>
					<Route
						path="habit/createHabit"
						element={
							<HabitProvider>
								<CreateHabit />
							</HabitProvider>
						}
					/>
					<Route path="measurements" element={<Measurements />} />
                    <Route path="logOut" element={<LogOut/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
