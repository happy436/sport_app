import React from "react";
import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";

type MainPageProps = NonNullable<unknown>

const MainPage: React.FC<MainPageProps> = () => {

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
