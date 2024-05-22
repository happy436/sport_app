import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHabits } from "../../store/habits";
import { Button, Card } from "@tremor/react";
import Page from "../../components/common/page";

export interface habitData {
	_id: string;
	name: string;
	description: string;
	value: number;
	goal: number;
	units: string;
	icon: string;
	color: string;
	tags: string[];
	goalPeriod: string;
	reminderTime: string[];
	reminderMessage: string;
	showMemo: boolean;
}

const Habits: React.FC = () => {
	// TODO custom hook
	const data:[] = useSelector(getHabits()) || [];
	/* const loadHabits = () => dispatch(loadHabitsList());
	useEffect(() => {
		loadHabits();
	}, []); */

	const getPercent = (habit: habitData) => {
		const { value, goal } = habit;
		return (Number(value) * 100) / Number(goal);
	};

	return (
		<Page>
			<Page.PageTitle>Habits</Page.PageTitle>
			{/* TODO calendar */}
			{/* TODO filter*/}
			<Page.PageContent>
				<ul className="w-full">
					{data.length !== 0 ? (
						data.map((habit: habitData) => (
							<Link
								to={`/habit/${habit._id}`}
								key={habit._id}
								className="w-full"
							>
								<li className="w-full">
									<Card
										decoration="top"
										decorationColor="indigo"
										className="text-white w-full overflow-hidden relative"
									>
										<div
											className={`h-full absolute bg-indigo-500/25 left-0 top-0`}
											style={{
												width: `${getPercent(habit)}%`,
											}}
										></div>
										<span className="text-xs absolute top-0 right-3">
											🔥 1 Day
										</span>
										<div className="flex gap-3 items-center w-full">
											<div className="h-full flex items-center text-2xl">
												{habit.icon}
											</div>
											<div className="flex justify-between items-center w-full">
												<div className="flex flex-col gap-1 items-start w-1/2">
													<span className="text-xl truncate w-full">
														{habit.name}
													</span>
													<span className="text-sm truncate w-full">
														{habit.description}
													</span>
												</div>
												<div className="flex">
													<span className="text-lg">
														{habit.value} /{" "}
														{habit.goal}{" "}
														{habit.units}
													</span>
												</div>
											</div>
										</div>
									</Card>
								</li>
							</Link>
						))
					) : (
						<p className="text-2xl text-center">Empty</p>
					)}
				</ul>

				<Link to="/habit/createHabit" className="fixed bottom-10">
					<Button
						color="indigo"
						className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
					>
						+
					</Button>
				</Link>
			</Page.PageContent>
		</Page>
	);
};

export default Habits;
