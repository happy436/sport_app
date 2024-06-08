import React, { useState, useEffect } from "react";
import Page from "../../components/common/page";
import {
	AccordionList,
	Button,
	DatePicker,
	Dialog,
	DialogPanel,
	Select,
	SelectItem,
	TextInput,
} from "@tremor/react";
import Measurement from "./measurement";

type measurementsProps = {};

const Measurements: React.FC<measurementsProps> = () => {
	const mockData = [
		{
			_id: "awdasdawdasdwa",
			name: "Biceps",
			units: "mm",
			createdAt: "01.02.24",
			measurements: [
				{ date: "01.02.24", value: 36 },
				{ date: "01.03.24", value: 35 },
				{ date: "01.04.24", value: 35.5 },
				{ date: "01.05.24", value: 37 },
				{ date: "01.06.24", value: 38 },
				{ date: "01.07.24", value: 31 },
				{ date: "01.08.24", value: 31 },
				{ date: "01.09.24", value: 31 },
				{ date: "01.10.24", value: 31 },
				{ date: "01.11.24", value: 31 },
				{ date: "01.12.24", value: 31 },
				{ date: "01.01.25", value: 31 },
				{ date: "01.02.25", value: 31 },
				{ date: "01.03.25", value: 31 },
				{ date: "01.04.25", value: 31 },
				{ date: "01.05.25", value: 31 },
				{ date: "01.06.25", value: 31 },
				{ date: "01.07.25", value: 31 },
				{ date: "01.08.25", value: 31 },
				{ date: "01.09.25", value: 31 },
				{ date: "01.10.25", value: 31 },
				{ date: "01.11.25", value: 31 },
				{ date: "01.12.25", value: 31 },
				{ date: "01.01.26", value: 31 },
				{ date: "01.02.26", value: 31 },
				{ date: "01.03.26", value: 31 },
				{ date: "01.04.26", value: 31 },
				{ date: "01.05.26", value: 31 },
				{ date: "01.06.26", value: 31 },
				{ date: "01.07.26", value: 31 },
				{ date: "01.08.26", value: 31 },
				{ date: "01.09.26", value: 31 },
				{ date: "01.10.26", value: 31 },
				{ date: "01.11.26", value: 31 },
				{ date: "01.12.26", value: 31 },
				{ date: "01.01.27", value: 31 },
			],
		},
		{
			_id: "awdasdawsdwa",
			name: "Cheast",
			units: "mm",
			createdAt: "01.02.24",
			measurements: [
				{ date: "01.02.24", value: 36 },
				{ date: "01.03.24", value: 35 },
				{ date: "01.04.24", value: 35.5 },
				{ date: "01.05.24", value: 37 },
				{ date: "01.06.24", value: 38 },
				{ date: "01.07.24", value: 31 },
				{ date: "01.08.24", value: 31 },
				{ date: "01.09.24", value: 31 },
				{ date: "01.10.24", value: 31 },
				{ date: "01.11.24", value: 31 },
				{ date: "01.12.24", value: 31 },
				{ date: "01.01.25", value: 31 },
				{ date: "01.02.25", value: 31 },
				{ date: "01.03.25", value: 31 },
				{ date: "01.04.25", value: 31 },
				{ date: "01.05.25", value: 31 },
				{ date: "01.06.25", value: 31 },
				{ date: "01.07.25", value: 31 },
				{ date: "01.08.25", value: 31 },
				{ date: "01.09.25", value: 31 },
				{ date: "01.10.25", value: 31 },
				{ date: "01.11.25", value: 31 },
				{ date: "01.12.25", value: 31 },
				{ date: "01.01.26", value: 31 },
				{ date: "01.02.26", value: 31 },
				{ date: "01.03.26", value: 31 },
				{ date: "01.04.26", value: 31 },
				{ date: "01.05.26", value: 31 },
				{ date: "01.06.26", value: 31 },
				{ date: "01.07.26", value: 31 },
				{ date: "01.08.26", value: 31 },
				{ date: "01.09.26", value: 31 },
				{ date: "01.10.26", value: 31 },
				{ date: "01.11.26", value: 31 },
				{ date: "01.12.26", value: 31 },
				{ date: "01.01.27", value: 31 },
			],
		},
	];
	const unitsArray = ["mm", "cm", "m", "kg"];
	const [activeDay, setActiveDay] = useState(0);
	const [inputText, setInputText] = useState("");
	const [inputSelect, setInputSelect] = useState("");
	// TODO validation error
	const [errors, setErrors] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const today = Date.now();
		const timestamp = new Date(
			new Date(today).setHours(0, 0, 0, 0)
		).getTime();
		setActiveDay(timestamp);
	}, []);
	const handleChangeDate = (value: number) => {
		if (value !== undefined) {
			const date = new Date(value);
			const timestamp = date.getTime();
			setActiveDay(timestamp);
		}
	};

	const validation = () => {
		// TODO validation and add toastify
        const error = []
        setErrors([])
		if (inputSelect === "") {
			setErrors((prev) => [...prev, "select"]);
            error.push(["select"])
		} 
        if (inputText === "") {
			setErrors((prev) => [...prev, "text"]);
            error.push("text")
		}
        if(error.length > 0){
            return false;
        }
        return true
	};

	return (
		<Page>
			<Page.PageTitle>Measurements</Page.PageTitle>
			<Page.PageContent>
				<section>
					{activeDay !== 0 && (
						<DatePicker
							onValueChange={handleChangeDate}
							defaultValue={new Date(activeDay)}
						/>
					)}
				</section>
				<div>
					<ul>
						<AccordionList>
							{mockData.map((item) => (
								<li key={item._id}>
									<Measurement data={item} />
								</li>
							))}
						</AccordionList>
					</ul>
				</div>
				<Button
					color="indigo"
					onClick={() => {
						setIsOpen(true);
					}}
					className=" fixed bottom-10 w-[30px] h-[30px] flex items-center justify-center rounded-full"
				>
					+
				</Button>
				<Dialog
					open={isOpen}
					onClose={(val) => {
						setIsOpen(val);
					}}
					static={true}
				>
					<DialogPanel className="flex flex-col gap-2">
						<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
							Create measurement
						</h3>
						<TextInput
							error={errors.includes("text")}
							errorMessage="Text input is empty!"
							value={inputText}
							placeholder={`Measurement name`}
							onValueChange={(value) => {
								setInputText(value);
							}}
						/>
						<Select
							error={errors.includes("select")}
							errorMessage="Select area is empty!"
							placeholder="Choose units"
							onValueChange={(value) => {
								setInputSelect(value);
							}}
						>
							{unitsArray.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</Select>
						<Button
							color="indigo"
							className=" w-full text-white"
							onClick={() => {
								validation() && setIsOpen(false);
                                
								
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
export default Measurements;
