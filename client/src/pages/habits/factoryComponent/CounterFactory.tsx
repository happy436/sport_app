import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Counter from "./Counter";
import Timer from "./Timer";

export type CounterFactoryProps = {
	value: number;
	color: string;
	goal: number;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	handleResetValue: () => void;
	units: string;
	percentValue: number;
	setValue: Dispatch<SetStateAction<number>>;
	id: string | undefined;
	timestamp: string | undefined;
};

const CounterFactory: React.FC<CounterFactoryProps> = (props) => {
	const { units } = props;
	const [type, setType] = useState("");
	const TIMER = "timer";
	const COUNTER = "counter";
	const timerTypesArray = ["sec", "min", "hr"];

	useEffect(() => {
		timerTypesArray.includes(units) ? setType(TIMER) : setType(COUNTER);
	}, []);

	switch (type) {
		case COUNTER:
			return <Counter {...props} />;
			break;
		case TIMER:
			return <Timer {...props} />;
			break;
	}
};
export default CounterFactory;
