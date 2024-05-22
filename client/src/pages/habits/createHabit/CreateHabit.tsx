import React, { useState } from "react";
import TextField from "../../../components/common/textField";
import { Button, Card } from "@tremor/react";
import IconColor from "./blocks/IconColor";
import Tags from "./blocks/Tags";
import Goal from "./blocks/Goal";
import Reminder from "./blocks/Reminder";
import { createHabit } from "../../../store/habits";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface HabitData {
	name: string;
	description: string;
	color: string;
	icon: string;
	tags: string[];
    value:number;
	goal: number;
	units: string;
	goalPeriod: string;
	reminderTime: string[];
	reminderMessage: string;
	showMemo: boolean;
}

const CreateHabitPage = () => {
    // TODO to do useHabit castom hook
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const colorList = [
		"slate",
		"gray",
		"zinc",
		"neutral",
		"stone",
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	];

	function getRandomColor() {
		const randomIndex = Math.floor(Math.random() * colorList.length);
		return colorList[randomIndex].toString();
	}
	const [data, setData] = useState<HabitData>({
		name: "",
		description: "",
		color: getRandomColor(),
        // TODO icons 
		icon: "",
		// TODO save tags in global state for user and filter similar
		tags: [],
        value:0,
		goal: 0,
		units: "count",
		goalPeriod: "day",
		reminderTime: [],
		reminderMessage: "",
		showMemo: false,
	});

	const validateForm = (formData: HabitData) => {
        // TODO to do validation
		const errors = [];

		// Проверка обязательных полей
		if (!formData.name || formData.name.trim() === "") {
			errors.push({ field: "name", message: "Name is required" });
		}
		if (formData.goal === 0) {
			errors.push({
				field: "goal",
				message: "Goal can't be empty or zero",
			});
		}

		// Вывод ошибок
		if (errors.length > 0) {
			errors.forEach((error) => {
				toast.error(error.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				});
			});
			return false;
		}

		return true; // Форма прошла валидацию
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(e)
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	};
	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setData((prev) => ({
			...prev,
			[e.currentTarget.name]: e.currentTarget.value,
		}));
	};

	const showNotification = () => {
		new Notification("Reminder" /* title */, {
			body: "It's time!" /* body */,
		});
	};

	const setReminder = (time: string) => {
		const [hours, minutes] = time.split(":");
		const now = new Date();
		const notificationTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			Number(hours), // Часы (в данном случае 13:57)
			Number(minutes) // Минуты
		);

		if (Notification.permission === "granted") {
			scheduleNotification(notificationTime);
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then(function (permission) {
				if (permission === "granted") {
					scheduleNotification(notificationTime);
				}
			});
		}
	};

	const scheduleNotification = (time: Date) => {
		const currentTime = new Date();
		const timeDiff = time.getTime() - currentTime.getTime();
		console.log(timeDiff);
		if (timeDiff > 0) {
			setTimeout(() => {
				showNotification();
			}, timeDiff);
		} else {
			alert("Invalid time for reminder");
		}
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (data.reminderTime.length > 0 && data.reminderTime[0] !== "") {
			data.reminderTime.forEach((time) => setReminder(time));
		}

		dispatch(createHabit(data));
		if(validateForm(data)){
            navigate("/habits");
        }
		console.log(data);
	};
	return (
		<div className="flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-5">New habit</h2>
			<form autoComplete="off" className="flex flex-col gap-2">
				<Card>
					<TextField name="name" onChange={handleChange} />
				</Card>
				<Card>
					<TextField name="description" onChange={handleChange} />
				</Card>
				<IconColor
                    icon={data.icon}
					color={data.color}
					colorList={colorList}
					handleClick={handleClick}
				/>
				<Tags
					tags={data.tags}
					color={data.color}
					onChange={handleChange}
				/>
				<Goal
					handleChange={handleChange}
					color={data.color}
					goalPeriod={data.goalPeriod}
					units={data.units}
				/>
				<Reminder
					handleChange={handleChange}
					reminderTime={data.reminderTime}
					color={data.color}
				/>

				<Card>
					<div className=" flex gap-3 items-center">
						<label
							className="block text-white text-xl font-bold mb-2"
							htmlFor="showMemo"
						>
							Show Memo after Check-in
						</label>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								name="showMemo"
								className="sr-only peer"
								onChange={handleChangeCheckBox}
							/>
							<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>
				</Card>
				{/* TODO DIVIDER */}
				<Button
					className="text-white"
					type="submit"
					color={data.color}
					variant="primary"
					onClick={onSubmit}
				>
					Create Habit
				</Button>
			</form>
		</div>
	);
};

export default CreateHabitPage;
