import React, { useState, useEffect } from "react";
import Page from "../components/common/page";
import { DatePicker } from "@tremor/react";

type measurementsProps = {};

const Measurements: React.FC<measurementsProps> = () => {
	const [activeDay, setActiveDay] = useState(0);
	useEffect(() => {
		const today = Date.now();
		const timestamp = new Date(
			new Date(today).setHours(0, 0, 0, 0)
		).getTime();
		setActiveDay(timestamp);
	}, []);
	const handleChange = (value: number) => {
		if (value !== undefined) {
			const date = new Date(value);
			const timestamp = date.getTime();
			setActiveDay(timestamp);
		}
	};
	return (
		<Page>
			<Page.PageTitle>Measurements</Page.PageTitle>
			<Page.PageContent>
				<section>
					{activeDay !== 0 && (
						<DatePicker
							onValueChange={handleChange}
							defaultValue={new Date(activeDay)}
						/>
					)}
				</section>
			</Page.PageContent>
		</Page>
	);
};
export default Measurements;
