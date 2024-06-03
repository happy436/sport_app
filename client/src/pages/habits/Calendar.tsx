import { DatePicker, DatePickerValue } from "@tremor/react";
import React, { useState } from "react";

type CalendarProps = {};

const Calendar: React.FC<CalendarProps> = () => {
	const [activeDay, setActiveDay] = useState(new Date().getTime());
	const handleChange = (value: DatePickerValue) => {
		if (value !== undefined) {
			const date = new Date(value);
			const timestamp = date.getTime();
			setActiveDay(timestamp);
		}
	};

	return (
		<section>
			<DatePicker onValueChange={handleChange} defaultValue={new Date(activeDay)}/>
		</section>
	);
};
export default Calendar;
