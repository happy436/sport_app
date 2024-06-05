import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../../components/common/page";
import { useDispatch, useSelector } from "react-redux";
import { getHabitById } from "../../store/habits";
import {
	Button,
	Dialog,
	DialogPanel,
	NumberInput,
	Switch,
} from "@tremor/react";
import { habitData } from "./habits";
import { editHabitData } from "../../store/habits";
import { Bounce, toast } from "react-toastify";
import { RiArrowLeftLine, RiRestartLine } from "@remixicon/react";
import ProgressCircle from "@components/common/ProgressCircle";

type habitProps = {};

const Habit: React.FC<habitProps> = () => {
	const param = useParams();
	const { id, timestamp } = param;
	const habitData: habitData = useSelector(getHabitById(id));
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState(0);
	const [inputValue, setInputValue] = useState(0);
	const [persentValue, setPercentValue] = useState(0);
	const [isSwitchOn, setIsSwitchOn] = React.useState<boolean>(false);

	const handleSwitchChange = (value: boolean) => {
		setIsSwitchOn(value);
	};

	useEffect(() => {
		setValue(!habitData ? habitData.value : 0);
		setPercentValue((Number(value) * 100) / Number(habitData.goal));
	}, []);

	useEffect(() => {
		congratulations();
		setPercentValue((Number(value) * 100) / Number(habitData.goal));
	}, [value]);

	const handleIncreaseValue = () => {
		const newValue = Number(value) + Number(inputValue);
		setValue(newValue);
		dispatch(
			editHabitData({
				_id: habitData._id,
				history: [{ date: timestamp, value: newValue }],
			})
		);
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
			<Page.PageTitle>
				<div className="flex gap-3 items-center">
					<Link to="/habits">
						<Button icon={RiArrowLeftLine} />
					</Link>
					{habitData.name}
				</div>
			</Page.PageTitle>
			<Page.PageContent className="h-full justify-center">
				<div>
					<ProgressCircle
						value={persentValue}
						size="xxl"
						showAnimation
						color={habitData.color}
					>
						<span className="text-xl font-medium">
							{value} / {habitData.goal}
						</span>
					</ProgressCircle>
				</div>
				<div className="flex justify-center gap-3">
					<div className=" p-[16px] w-[46px]">
						{/* TODO Шаблони */}
					</div>
					<Button
						onClick={() => {
							setIsOpen(true);
						}}
					>
						<p className="text-xl">+</p>
					</Button>
					<Button icon={RiRestartLine} onClick={() => {}}></Button>
				</div>
				<Dialog
					open={isOpen}
					onClose={(val) => {
						setIsOpen(val);
						setInputValue(0);
					}}
					static={true}
				>
					<DialogPanel className="flex flex-col gap-2">
						<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
							Input value
						</h3>
						<NumberInput
							min="0"
							/* defaultValue={inputValue} */
							max={habitData.goal.toString()}
							placeholder={`Value (${habitData.units})`}
							onChange={handleChangeValue}
						/>
						{inputValue !== 0 && (
							<div className="flex gap-3">
								<Switch
									id="switch"
									name="switch"
									checked={isSwitchOn}
									onChange={handleSwitchChange}
								/>
								<label>Save the value?</label>
							</div>
						)}
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
