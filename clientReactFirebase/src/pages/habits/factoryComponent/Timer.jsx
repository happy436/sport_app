import React, { useEffect, useState } from "react";
import ProgressCircle from "@components/common/ProgressCircle";
import { Button } from "@tremor/react";
import { RiPauseLine, RiPlayFill, RiRestartLine } from "@remixicon/react";
import { useDispatch } from "react-redux";
import { editHabitData } from "../../../store/habits.js";

const Timer = ({
	color,
	goal,
	units,
	setValue,
	timestamp,
	id,
	handleResetValue,
}) => {
	const [couldown, setCouldown] = useState(1);
	const [goalTime, setGoalTime] = useState(0);
	const [start, setStart] = useState(false);
	const [percent, setPercent] = useState(100);
	const dispatch = useDispatch();

	const setCouldownData = () => {
		switch (units) {
			case "sec":
				setCouldown(goal);
				setGoalTime(goal);
				break;
			case "min":
				setCouldown(goal * 60);
				setGoalTime(goal * 60);
				break;
			case "hr":
				setCouldown(goal * 3600);
				setGoalTime(goal * 3600);
				break;
		}
	};

	useEffect(() => {
		setCouldownData();
	}, []);

	useEffect(() => {
		if (start) {
			const timerId = setInterval(() => {
				setCouldown((prevCouldown) => prevCouldown - 1);
			}, 1000);
			const diffPercent = (couldown * 100) / goalTime;
			setPercent(diffPercent);
			if (couldown === 0) {
				clearInterval(timerId);
				setStart(false);
				setValue(goal);
				dispatch(
					editHabitData({
						_id: id,
						history: { value: goal, date: Number(timestamp) },
					})
				);
			}
			return () => clearInterval(timerId);
		}
	}, [couldown, start]);

	const ResetValue = () => {
		handleResetValue();
		setCouldownData();
		setPercent(100);
	};

	function secondsToMinutes(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		const formattedHourses = String(hours).padStart(2, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(remainingSeconds).padStart(2, "0");

		return `${formattedHourses}:${formattedMinutes}:${formattedSeconds}`;
	}

	return (
		<>
			<div>
				<ProgressCircle
					value={percent}
					size="xxl"
					showAnimation
					color={color}
				>
					<span className="text-xl font-medium">
						{secondsToMinutes(couldown)}
					</span>
				</ProgressCircle>
			</div>
			<div className="flex justify-center gap-3">
				<div className=" p-[16px] w-[46px]"></div>
				{!start ? (
					<Button
						color={color}
						onClick={() => {
							setStart(true);
						}}
						icon={RiPlayFill}
					></Button>
				) : (
					<Button
						color={color}
						onClick={() => {
							setStart(false);
						}}
						icon={RiPauseLine}
					></Button>
				)}
				<Button
					color={color}
					icon={RiRestartLine}
					onClick={ResetValue}
				></Button>
			</div>
		</>
	);
};
export default Timer;
