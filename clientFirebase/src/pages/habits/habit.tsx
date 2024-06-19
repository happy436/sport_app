import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../../components/common/page";
import { useDispatch, useSelector } from "react-redux";
import { getHabitById } from "../../store/habits.js";
import {
	Button,
	Dialog,
	DialogPanel,
	NumberInput,
	Switch,
} from "@tremor/react";
import { habitData } from "./habits";
import { editHabitData } from "../../store/habits.js";
import { Bounce, toast } from "react-toastify";
import { RiArrowLeftLine } from "@remixicon/react";
import { historyData } from "../home";
import CounterFactory from "./factoryComponent/CounterFactory";

type habitProps = {};

const Habit: React.FC<habitProps> = () => {
	const param = useParams();
	const { id, timestamp } = param;
	const habitData: habitData = useSelector(getHabitById(id));
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState<number>(0);
	const [inputValue, setInputValue] = useState(0);
	const [persentValue, setPercentValue] = useState(0);
	const [isSwitchOn, setIsSwitchOn] = React.useState<boolean>(false);

	const handleSwitchChange = (value: boolean) => {
		setIsSwitchOn(value);
	};

	useEffect(() => {
		if (habitData) {
			const findItem = habitData.history.find(
				(item: historyData) => item.date === Number(timestamp)
			);
			findItem && setValue(findItem.value);
		}

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
				history: { value: newValue, date: Number(timestamp) },
			})
		);
	};

	const handleResetValue = () => {
		const newValue = 0;
		setValue(newValue);
		dispatch(
			editHabitData({
				_id: habitData._id,
				history: { value: newValue, date: Number(timestamp) },
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
						<Button icon={RiArrowLeftLine} color={habitData.color}/>
					</Link>
					{habitData.name}
				</div>
				<p className="text-xl font-normal">{habitData.description}</p>
			</Page.PageTitle>
			<Page.PageContent className="h-full justify-center">
				<CounterFactory
					persentValue={persentValue}
                    value={value}
                    id={id}
					color={habitData.color}
					goal={habitData.goal}
                    units={habitData.units}
					setIsOpen={setIsOpen}
					handleResetValue={handleResetValue}
                    setValue={setValue}
                    timestamp={timestamp}
				/>
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
                        // TODO validation and error
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
