import { Card, Divider, ProgressCircle } from "@tremor/react";
import React from "react";
import { Link } from "react-router-dom";

type profileProps = {};

const Home: React.FC<profileProps> = () => {
	const cardList = [
		/* { url: "/measurements", name: "Measurements", color: "lime" },
		{ url: "/nutrition", name: "Nutrition", color: "yellow" }, */
	];
	return (
		<>
			{/* <div className="flex items-end gap-3">
				<p className="text-slate-500">Hello</p>
				<p className="text-2xl">Ly</p>
			</div> */}
			<div>
				<div>
					<h3 className="text-2xl">Actions</h3>
					<Divider></Divider>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						<li>
							<Link to="/habits">
								<Card
									className="mx-auto max-w-xs flex gap-3 hover:bg-slate-800"
									decoration="top"
									decorationColor="indigo"
								>
									<ProgressCircle
										value={75}
										size="md"
										color="indigo"
									>
										<span className="text-xs font-medium text-white">
											75%
										</span>
									</ProgressCircle>
									<div>
										<p className="text-3xl font-bold text-white">
											Daily
										</p>
										<p className="text-slate-500">
											3 / 4 Complete
										</p>
									</div>
								</Card>
							</Link>
						</li>
						{cardList.map((card) => (
							<li key={card.name}>
								<Link to={card.url}>
									<Card
										className="mx-auto max-w-xs h-full flex items-center justify-center hover:bg-slate-800"
										decoration="top"
										decorationColor={card.color}
									>
										<p className="text-3xl text-white">
											{card.name}
										</p>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default Home;
