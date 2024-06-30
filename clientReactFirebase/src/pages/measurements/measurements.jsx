import React, { useState, useEffect } from "react";
import Page from "../../components/common/page";
import {
	AccordionList,
	Button,
	DatePicker,
	Dialog,
	DialogPanel,
	NumberInput,
	Select,
	SelectItem,
	TextInput,
} from "@tremor/react";
import Measurement from "./measurement";
import {
	createMeasure,
	createMeasurementCategory,
	getMeasurements,
	loadMeasurementsList,
} from "../../store/measurements";
import { useDispatch, useSelector } from "react-redux";
import { getStartOfDayTimestamp } from "@/utils/getStartOfDayTimestamp";
import { formatDate } from "@/utils/formatDate";
import pagesService from "../../services/pages.service";

const Measurements = () => {
	const dispatch = useDispatch();

	const data = useSelector(getMeasurements());

	const [unitsArray, setUnits] = useState([]);

	const fetchUnits = async () => {
		const fetch = await pagesService.getUnitsForMeasurementPage();
		setUnits(fetch);
	};

	useEffect(() => {
		fetchUnits();
	}, []);

	const [activeDay, setActiveDay] = useState(0);
	const [inputText, setInputText] = useState("");
	const [inputSelect, setInputSelect] = useState("");
	// TODO validation error
	const [errors, setErrors] = useState([]);
	const [isOpen, setIsOpen] = useState({
		createMeasurement: false,
		addMeasure: false,
	});
	useEffect(() => {
		const timestamp = getStartOfDayTimestamp();
		dispatch(loadMeasurementsList());
		setActiveDay(timestamp);
	}, []);
	const handleChangeDate = (value) => {
		if (value !== undefined) {
			const timestamp = getStartOfDayTimestamp(value);
			setActiveDay(timestamp);
		}
	};

	const validation = () => {
		// TODO validation and add toastify
		const error = [];
		setErrors([]);
		if (inputSelect === "") {
			setErrors((prev) => [...prev, "select"]);
		}
		if (inputText === "") {
			setErrors((prev) => [...prev, "text"]);
		}
		if (error.length > 0) {
			return false;
		}
		return true;
	};

	const onSubmit = () => {
		if (validation()) {
			dispatch(
				createMeasurementCategory({
					name: inputText,
					units: inputSelect,
				})
			);
			setIsOpen((prev) => ({ ...prev, createMeasurement: false }));
		}
	};

	const [inputTextModal, setInputTextModal] = useState(0);
	const [errorsModal, setErrorsModal] = useState([]);

	const validationModal = () => {
		// TODO validation and add toastify
		const error = [];
		setErrors([]);
		if (inputText) {
			setErrorsModal((prev) => [...prev, "text"]);
		}
		if (error.length > 0) {
			return false;
		}
		return true;
	};
	const [editedCategoryId, setEditedCategoryId] = useState("");

	const handleAddMeasure = () => {
		setIsOpen((prev) => ({ ...prev, addMeasure: false }));
		const formatedDate = formatDate(activeDay);
		const data = {
			_id: editedCategoryId,
			data: { value: inputTextModal, date: formatedDate },
		};
		if (validationModal()) {
			dispatch(createMeasure(data));
		}
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
					<ul className="mb-[60px]">
						<AccordionList>
							{data.map((item) => (
								<li key={item._id}>
									<Measurement
										data={item}
										date={activeDay}
										setIsOpenModal={setIsOpen}
										setEditedCategoryId={
											setEditedCategoryId
										}
									/>
								</li>
							))}
						</AccordionList>
					</ul>
				</div>
				<Button
					color="indigo"
					onClick={() => {
						setIsOpen((prev) => ({
							...prev,
							createMeasurement: true,
						}));
					}}
					className=" fixed bottom-10 w-[30px] h-[30px] flex items-center justify-center rounded-full"
				>
					+
				</Button>
				<Dialog
					open={isOpen.createMeasurement}
					onClose={(val) => {
						setIsOpen((prev) => ({
							...prev,
							createMeasurement: val,
						}));
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
								onSubmit();
							}}
							type="button"
						>
							Got it!
						</Button>
					</DialogPanel>
				</Dialog>
				<Dialog
					open={isOpen.addMeasure}
					onClose={(val) => {
						setIsOpen((prev) => ({ ...prev, addMeasure: val }));
					}}
					static={true}
					className="rouded-xl"
				>
					<DialogPanel className="flex flex-col gap-2 p-6">
						<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
							Add {} measurement
						</h3>
						<NumberInput
							error={errorsModal.includes("text")}
							errorMessage="Text input is empty!"
							placeholder={`Measurement size`}
							onValueChange={(value) => {
								setInputTextModal(value);
							}}
						/>
						<Button
							color="indigo"
							className=" w-full text-white"
							onClick={() => {
								handleAddMeasure();
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
