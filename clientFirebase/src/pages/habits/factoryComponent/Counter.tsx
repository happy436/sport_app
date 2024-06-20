import { Button } from "@tremor/react";
import ProgressCircle from "@components/common/ProgressCircle";
import React from "react";
import { RiRestartLine } from "@remixicon/react";
import { CounterFactoryProps } from "./CounterFactory";

type CounterProps = CounterFactoryProps;

const Counter: React.FC<CounterProps> = ({
	persentValue,
	color,
	value,
	goal,
	setIsOpen,
	handleResetValue,
}) => {
	return (
		<>
			<div>
				<ProgressCircle
					value={persentValue}
					size="xxl"
					showAnimation
					color={color}
				>
					<span className="text-xl font-medium">
						{value} / {goal}
					</span>
				</ProgressCircle>
			</div>
			<div className="flex justify-center gap-3">
				<div className=" p-[16px] w-[46px]">{/* TODO Шаблони */}</div>
				<Button
					onClick={() => {
						setIsOpen(true);
					}}
                    color={color}
                    disabled={value >= goal} tooltip="Disabled"
				>
					<p className="text-xl">+</p>
				</Button>
				<Button
					icon={RiRestartLine}
                    color={color}
					onClick={handleResetValue}
				></Button>
			</div>
		</>
	);
};
export default Counter;
