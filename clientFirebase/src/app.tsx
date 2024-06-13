import { Card } from "@tremor/react";
import { Routes, Route, useLocation, Link, Outlet } from "react-router-dom";
import MainPage from "./pages/main";
import Home from "./pages/home";
import Habits from "./pages/habits/habits";
import Habit from "./pages/habits/habit";
import Measurements from "./pages/measurements/measurements.tsx";
import CreateHabit from "./pages/habits/createHabit/CreateHabit.tsx";
import Default from "./pages/default.tsx";
import LoginFactory from "./pages/login/loginFactory.tsx";



function App() {
	const location = useLocation();
	return (
		<>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<LoginFactory />} />
				{/* 				<Route path="signin" element={<SignIn />} />
				<Route path="signup" element={<SignUp />} /> */}
				<Route path="/*" element={<MainPage />}>
					<Route path="home" element={<Home />} />
					<Route path="habits" element={<Habits />} />
					<Route path="habit/:id/:timestamp" element={<Habit />} />
					<Route path="habit/createHabit" element={<CreateHabit />} />
					<Route path="measurements" element={<Measurements />} />
					{/* 					<Route path="profile" element={<Profile />}>
						<Route path="one" element={<Profile1 />} />
					</Route> */}
				</Route>
			</Routes>
		</>
	);
}

export default App;
