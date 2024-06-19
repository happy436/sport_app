import { Card } from "@tremor/react";
import React from "react";
import { Link } from "react-router-dom";

type ListCardsProps = {};

const ListCards: React.FC<ListCardsProps> = () => {
	const cardList = [
		/* { url: "/measurements", name: "Measurements", color: "lime" }, */
		/*{ url: "/nutrition", name: "Nutrition", color: "yellow" }, */
	];

	return (
		<>
			{cardList.map((card) => (
				<li key={card.name}>
					<Link to={card.url}>
						<Card
							className="mx-auto max-w-xs h-full flex items-center justify-center hover:bg-slate-800"
							decoration="top"
							decorationColor={card.color}
						>
							<p className="text-3xl text-white">{card.name}</p>
						</Card>
					</Link>
				</li>
			))}
		</>
	);
};
export default ListCards;
