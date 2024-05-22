import {
	Button,
	Card,
	Dialog,
	DialogPanel,
	NumberInput,
	TextInput,
} from "@tremor/react";
import React, { useState } from "react";

type goalProps = {
	handleChange: () => void;
	color: string;
	units: string;
	goalPeriod: string;
};

const Goal: React.FC<goalProps> = ({
	handleChange,
	color,
	goalPeriod,
	units,
}) => {
	const unitsButtonList = [
		"count",
		"steps",
		"m",
		"km",
		"sec",
		"min",
		"hr",
		"ml",
		"l",
		"Cal",
		"Kcal",
		"g",
		"mg",
		"kg",
	];
	const goalPeriodButtonsList = ["day", "week", "month"];
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Card>
			<div className="mb-4">
				<label
					className="block text-white text-xl font-bold mb-2"
					htmlFor="goal"
				>
					Goal & Goal Period
				</label>
				<div className="flex gap-2 items-center flex-wrap">
					<NumberInput
						className="max-w-[100px] bg-white"
						enableStepper={false}
						id="goal"
						name="goal"
						onChange={handleChange}
						placeholder="goal number"
						min="0"
						max="10000"
					/>
					<Button
						color={color}
						type="button"
						className="p-2 flex items-center justify-center w-24 overflow-hidden"
						onClick={() => setIsOpen(true)}
					>
						<p className="truncate w-20">{units}</p>
					</Button>
					<Dialog
						open={isOpen}
						onClose={(val) => setIsOpen(val)}
						static={true}
					>
						<DialogPanel className="flex flex-col gap-2">
							<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
								Input units
							</h3>
							<ul className="flex flex-wrap gap-3">
								{unitsButtonList.map((button) => (
									<li key={button}>
										<Button
											type="button"
											name={button}
											onClick={() =>
												handleChange({
													target: {
														name: "units",
														value: button,
													},
												})
											}
											variant={
												units === button
													? "primary"
													: "secondary"
											}
										>
											{button}
										</Button>
									</li>
								))}
							</ul>
							<Button
								color={color}
								className=" w-full text-white"
								onClick={() => {
									setIsOpen(false);
								}}
								type="button"
							>
								Got it!
							</Button>
						</DialogPanel>
					</Dialog>
					<p> / </p>
					<div className="flex gap-2 items-center">
						{goalPeriodButtonsList.map((button) => (
							<Button
								key={button}
								color={color}
								variant={
									goalPeriod === button
										? "primary"
										: "secondary"
								}
								type="button"
								name={button}
								onClick={() =>
									handleChange({
										target: {
											name: "goalPeriod",
											value: button,
										},
									})
								}
							>
								{`${button[0].toUpperCase() + button.slice(1)}`}
							</Button>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};
export default Goal;
