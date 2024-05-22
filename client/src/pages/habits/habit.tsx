import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../../components/common/page";
import { useDispatch, useSelector } from "react-redux";
import { getHabitById } from "../../store/habits";
import {
	Button,
	Dialog,
	DialogPanel,
	NumberInput,
	ProgressCircle,
	TextInput,
} from "@tremor/react";
import { habitData } from "./habits";
import { editHabitData } from "../../store/habits";
import { Bounce, toast } from "react-toastify";
import { RiRestartLine } from "@remixicon/react";

type habitProps = {};

const Habit: React.FC<habitProps> = () => {
	const param = useParams();
	const habitID = param.id;
	const habitData: habitData = useSelector(getHabitById(habitID));
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState(0);
	const [inputValue, setInputValue] = useState(0);
	const [persentValue, setPercentValue] = useState(0);

	useEffect(() => {
		setValue(habitData.value);
		setPercentValue((Number(value) * 100) / Number(habitData.goal));
	}, []);

	useEffect(() => {
		congratulations();
		setPercentValue((Number(value) * 100) / Number(habitData.goal));
	}, [value]);

	const handleIncreaseValue = () => {
        const newValue = Number(value) + Number(inputValue)
		setValue(newValue);
        dispatch(editHabitData({ _id: habitData._id, value: newValue }));
	};

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value !== "") {
			setInputValue(Number(e.target.value));
		}
	};

	const congratulations = () => {
		if (value === habitData.goal) {
			toast.success("You did it!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			});
		}
	};

	return (
		<Page className="h-full">
			<Page.PageTitle>{habitData.name}</Page.PageTitle>
			<Page.PageContent className="h-full justify-center">
				<div>
					<ProgressCircle
						value={persentValue}
						size="xl"
						showAnimation
						color={habitData.color}
					>
						<span className="text-xs font-medium">
							{value} / {habitData.goal}
						</span>
					</ProgressCircle>
				</div>
				<div className="flex justify-center gap-3">
					<div className="flex-1 p-[16px]"></div>
					<Button
						onClick={() => {
							setIsOpen(true);
						}}
						className="flex-1"
					>
						<p className="text-xl">+</p>
					</Button>
					<Button className="flex-1" icon={RiRestartLine}></Button>
				</div>
				<Dialog
					open={isOpen}
					onClose={(val) => setIsOpen(val)}
					static={true}
				>
					<DialogPanel className="flex flex-col gap-2">
						<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
							Input value
						</h3>
						<NumberInput
							min="0"
							max={habitData.goal.toString()}
							placeholder={`Value (${habitData.units})`}
							onChange={handleChangeValue}
						/>
						<Button
							color={habitData.color}
							className=" w-full text-white"
							onClick={() => {
								setIsOpen(false);
								handleIncreaseValue();
                                
							}}
							type="button"
						>
							Got it!
						</Button>
					</DialogPanel>
				</Dialog>
			</Page.PageContent>
		</Page>
	);
};
export default Habit;
