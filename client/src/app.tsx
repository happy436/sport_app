import { Card } from "@tremor/react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import MainPage from "./pages/main";
import Home from "./pages/home";
import Daily from "./pages/habits";
import Measurements from "./pages/measurements";

const Profile = () => <div>Профиль пользователя</div>;
const Profile1 = () => <div>Подстраница профиля</div>;
const SignIn = () => <div>Страница входа</div>;
const SignUp = () => <div>Страница регистрации</div>;
const Default = () => {
	return (
		<div>
			<p>Default</p>
			<Link to="/profile">
				<Card>
					<p className="text-white">Profile</p>
				</Card>
			</Link>
			{/* <Link to="/signin">
				<Card>
					<p className="text-white">Sign In</p>
				</Card>
			</Link>
			<Link to="/signup">
				<Card>
					<p className="text-white">Sign up</p>
				</Card>
			</Link> */}
		</div>
	);
};

function App() {
	const location = useLocation();
	return (
		<>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Default />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="/*" element={<MainPage />}>
                    <Route path="home" element={<Home/>}/>
                    <Route path="habits" element={<Daily/>}/>
                    <Route path="measurements" element={<Measurements/>}/>
					<Route path="profile" element={<Profile />}>
						<Route path="one" element={<Profile1 />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
