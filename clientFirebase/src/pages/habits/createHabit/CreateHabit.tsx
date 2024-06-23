import React, { useState } from "react";
import TextField from "../../../components/common/textField";
import { Button, Card, Color } from "@tremor/react";
import IconColor from "./blocks/IconColor";
//import Tags from "./blocks/Tags";
import Goal from "./blocks/Goal";
//import Reminder from "./blocks/Reminder";
import { createHabit } from "../../../store/habits.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { habitData } from "../../home/home.js";
import { Dispatch } from "@reduxjs/toolkit";

export interface CustomEvent {
	target: {
		name: string;
		value: string;
	};
}

const CreateHabitPage = () => {
	// TODO to do useHabit castom hook
	const dispatch: Dispatch = useDispatch();
	const navigate = useNavigate();
	const colorList: Color[] = [
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

	function getRandomColor(): Color {
		const randomIndex = Math.floor(Math.random() * colorList.length);
		return colorList[randomIndex];
	}
	const [data, setData] = useState<habitData>({
		name: "",
		description: "",
		color: getRandomColor(),
		icon: "",
		// TODO save tags in global state for user and filter similar
		tags: [""],
		goal: 0,
		units: "count",
		goalPeriod: "day",
		reminderTime: [],
		reminderMessage: "",
		showMemo: false,
	});

	const validateForm = (formData: habitData) => {
		// TODO to do validation
		const errors = [];

		if (!formData.name || formData.name.trim() === "") {
			errors.push({ field: "name", message: "Name is required" });
		}
		if (formData.goal === 0) {
			errors.push({
				field: "goal",
				message: "Goal can't be empty or zero",
			});
		}

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

		return true; 
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleCustomChange = (e: CustomEvent): void => {
		const target = e.target;
		setData((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};
	/* const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	}; */
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const target = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
		setData((prev) => ({
			...prev,
			[target.name]: target.value, // Use target.name and target.value
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
			Number(hours), 
			Number(minutes) 
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
		if (validateForm(data)) {
			navigate("/habits");
		}
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
				{/* 				<Tags
					tags={data.tags}
					color={data.color}
					onChange={handleChange}
				/> */}
				<Goal
					handleChange={handleChange}
					handleCustomChange={handleCustomChange}
					color={data.color}
					goalPeriod={data.goalPeriod}
					units={data.units}
				/>
				{/* <Reminder
					handleChange={handleCustomChange}
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
				</Card>*/}
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
