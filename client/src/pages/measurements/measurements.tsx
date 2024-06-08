import React, { useState, useEffect } from "react";
import Page from "../../components/common/page";
import { AccordionList, Button, DatePicker } from "@tremor/react";
import Measurement from "./measurement";

type measurementsProps = {};

const Measurements: React.FC<measurementsProps> = () => {
	const mockData = [
		{
			_id: "awdasdawdasdwa",
			name: "Biceps",
			units: "mm",
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
			_id: "awdasdawdasdwa",
			name: "Cheast",
			units: "mm",
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
				<div>
					<ul>
                    <AccordionList>
						{mockData.map((item) => (
							<li>
                                
								<Measurement data={item} />
							</li>
						))}
                        </AccordionList>
					</ul>
				</div>
				<Button
					color="indigo"
					className=" fixed bottom-10 w-[30px] h-[30px] flex items-center justify-center rounded-full"
				>
					+
				</Button>
			</Page.PageContent>
		</Page>
	);
};
export default Measurements;
