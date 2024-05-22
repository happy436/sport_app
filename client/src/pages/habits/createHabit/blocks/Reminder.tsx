import { Button, Card, Dialog, DialogPanel } from "@tremor/react";
import React, { useState } from "react";
import TextField from "../../../../components/common/textField";

type reminderProps = {
	handleChange: () => void;
	reminderTime: [];
	color: string;
};

const Reminder: React.FC<reminderProps> = ({
	handleChange,
	reminderTime,
	color,
}) => {
	const [selectedTime, setSelectedTime] = useState("00:00");
	const [isOpen, setIsOpen] = useState(false);
	const handleChangeTime = (e) => {
		setSelectedTime(e.target.value);
	};
	const handleDelete = (tag: string) => {
		const newTags = reminderTime.filter((el) => el !== tag);
		handleChange({ target: { name: "reminderTime", value: newTags } });
	};
	return (
		<>
			<Card>
				<div className="mb-4">
					<label
						className="block text-white text-xl font-bold mb-2"
						htmlFor="reminders"
					>
						Reminders
					</label>
					<div className="flex gap-2">
						{reminderTime.map((item) => (
							<div
								key={item}
								className={`flex gap-2 items-center bg-${color}-600 w-max rounded-xl text-white p-2`}
							>
								<p>{item}</p>
								<Button
									color={color}
									className="p-2"
									onClick={() => {
										handleDelete(item);
									}}
								>
									x
								</Button>
							</div>
						))}
						<Button
							color={color}
							type="button"
							className="p-2 flex items-center justify-center"
							onClick={() => {
								setIsOpen(true);
							}}
						>
							+
						</Button>
						<Dialog
							open={isOpen}
							onClose={(val) => setIsOpen(val)}
							static={true}
						>
							<DialogPanel className="flex flex-col gap-2 w-max">
								<div className="max-w-[8rem] mx-auto">
									<label
										htmlFor="time"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Select time:
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
											<svg
												className="w-4 h-4 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													fillRule="evenodd"
													d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<input
											type="time"
											id="time"
											className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											min="09:00"
											max="18:00"
											value={selectedTime}
											onChange={handleChangeTime}
											required
										/>
									</div>
								</div>

								<Button
									color={color}
									className=" w-full text-white"
									onClick={() => {
										handleChange({
											target: {
												name: "reminderTime",
												value: [
													...reminderTime,
													selectedTime,
												],
											},
										});
										setIsOpen(false);
									}}
									type="button"
								>
									Got it!
								</Button>
							</DialogPanel>
						</Dialog>
					</div>
				</div>
			</Card>

			{reminderTime.length !== 0 && (
				<Card>
					<TextField
						placeholder="Reminder Time"
						name="reminderMessage"
						onChange={handleChange}
					/>
				</Card>
			)}
		</>
	);
};
export default Reminder;
