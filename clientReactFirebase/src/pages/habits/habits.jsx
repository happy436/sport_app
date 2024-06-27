import React ,{useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, DatePicker } from "@tremor/react";
import Page from "../../components/common/page.jsx";
import HabitCard from "./habitCard.jsx";
import { useHabit } from "../../hook/useHabits.jsx";

const Habits = () => {
	const { handleChangeDate, activeDay, habits } = useHabit();

    useEffect(() => {
        console.log("habits init")
    },[])

	// TODO calculate streak
	/* function calculateStreak(currentDate:number, data:habitData) {
		const startOfDay = new Date(
			new Date(currentDate).setHours(0, 0, 0, 0)
		).getTime();
        let streak = 0
        const {history, goal} = data
        const filteredData = history.filter((entry, index, array) => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            // TODO finished this function
            return false;
        });
        streak = filteredData.length;
		return streak > 0 ? `🔥 ${streak} Day${streak > 1 ? "s" : ""}` : "";
	} */

	return (
		<Page>
			<Page.PageTitle>Habits</Page.PageTitle>
			{/* TODO filter*/}
			<Page.PageContent>
				<section>
					{activeDay !== 0 && (
						<DatePicker
							onValueChange={handleChangeDate}
							defaultValue={new Date(activeDay)}
						/>
					)}
				</section>

				{habits.length !== 0 ? (
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{habits
							.filter(
								(item) => activeDay >= item.createdAt
							)
							.map((habit) => (
								<Link
									to={`/habit/${habit._id}/${activeDay}`}
									key={habit._id}
									className="w-full"
								>
									<HabitCard habit={habit} />
								</Link>
							))}
					</ul>
				) : (
					<p className="text-2xl text-center">Empty</p>
				)}

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
