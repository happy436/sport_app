import { Card, ProgressCircle } from "@tremor/react";
import React from "react";
import { Link } from "react-router-dom";
import { useHabit } from "../../hook/useHabits";

const DailyCard = () => {
	const { habits, completedDayliAchievements, achievements } = useHabit();
	return (
		<li>
			<Link to="/habits">
				<Card
					className="mx-auto max-w-xs flex gap-3 hover:bg-slate-800"
					decoration="top"
					decorationColor="indigo"
				>
					{habits.length !== 0 ? (
						<>
							<ProgressCircle
								value={completedDayliAchievements}
								size="md"
								color="indigo"
							>
								<span className="text-xs font-medium text-white">
									{completedDayliAchievements}%
								</span>
							</ProgressCircle>
							<div>
								<p className="text-3xl font-bold text-white">
									Daily
								</p>
								<p className="text-slate-500">
									{achievements} / {habits.length} Complete
								</p>
							</div>
						</>
					) : (
						<p className="text-3xl font-bold text-white text-center w-full">
							Daily
						</p>
					)}
				</Card>
			</Link>
		</li>
	);
};
export default DailyCard;
