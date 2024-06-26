import { Divider } from "@tremor/react";
import React from "react";
import ListCards from "./ListCards.jsx";
import DailyCard from "./DailyCard.jsx";

const Home = () => {
	
	return (
		<>
			
				<div>
					<div>
						<h3 className="text-2xl">Actions</h3>
						<Divider></Divider>
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							<DailyCard />
							<ListCards />
						</ul>
					</div>
				</div>
			
		</>
	);
};
export default Home;
