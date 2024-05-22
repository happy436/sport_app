import React from "react";
import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";

type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = () => {

	return (
		<>
			<AsideMenu/>
			<main className="p-4 w-full flex flex-col gap-3 sm:pl-44">
				<Outlet />
			</main>
		</>
	);
};
export default MainPage;
