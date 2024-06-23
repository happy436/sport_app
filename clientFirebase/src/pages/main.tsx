import React from "react";
import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";
import LoginFactory from "./login/loginFactory";
import { getIsLoggedIn } from "@/store/users";
import { useSelector } from "react-redux";

type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = () => {
	const isLogin = useSelector(getIsLoggedIn());
	return (
		<>
			{isLogin ? (
				<>
					<AsideMenu />
					<main className="p-4 w-full flex flex-col gap-3 sm:pl-44 max-sm:mt-[50px]">
						<Outlet />
					</main>
				</>
			) : (
				<LoginFactory />
			)}
		</>
	);
};
export default MainPage;
