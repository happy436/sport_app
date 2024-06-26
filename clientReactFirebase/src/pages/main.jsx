import React from "react";
import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";

const MainPage = () => {

	return (
		<>
				<>
					<AsideMenu />
					<main className="p-4 w-full flex flex-col gap-3 sm:pl-44 max-sm:mt-[50px]">
						<Outlet />
					</main>
				</>
		</>
	);
};
export default MainPage;
