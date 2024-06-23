import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AreaChart,
    Button,
} from "@tremor/react";

type measurementProps = {
	data: measurementData;
	date: number;
};

type measurementData = {
	_id: string;
	name: string;
	measurements: measure[];
	units: string;
};

type measure = {
	date: string;
	value: number;
};

const Measurement: React.FC<measurementProps> = ({ data, date }) => {
	const customTooltip = (props) => {
		const { payload, active } = props;
		if (!active || !payload) return null;
		return (
			<div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
				{payload.map((category, idx) => {
					return (
						<div key={idx} className="flex flex-1 space-x-2.5">
							<div
								className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
							/>
							<div className="space-y-1">
								<p className="text-tremor-content">
									{category.payload.date}
								</p>
								<p className="font-medium text-tremor-content-emphasis">
									{category.value} {data.units}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	};
	const getClosestData = (data, timestamp) => {
		// Конвертируем timestamp в Date объект
		const targetDate = new Date(timestamp);

		// Функция для преобразования строки даты в объект Date
		const parseDate = (dateString) => {
			const [day, month, year] = dateString.split(".").map(Number);
			return new Date(year + 2000, month - 1, day);
		};

		// Найти ближайшую дату
		const closestIndex = data.reduce((closest, current, index) => {
			const currentDate = parseDate(current.date);
			const currentDiff = Math.abs(currentDate - targetDate);
			const closestDate = parseDate(data[closest].date);
			const closestDiff = Math.abs(closestDate - targetDate);
			return currentDiff < closestDiff ? index : closest;
		}, 0);

		// Извлекаем 7 объектов, включая ближайший и 6 предыдущих
		const start = Math.max(0, closestIndex - 6);
		const result = data.slice(start, closestIndex + 1);

		return result;
	};
	return (
		<>
			<Accordion>
				<AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
					{data.name}
				</AccordionHeader>
				<AccordionBody className="leading-6 flex flex-col items-center gap-3">
					<AreaChart
						className="mt-4 h-72"
						data={getClosestData(data.measurements, date)}
						index="date"
						categories={["value"]}
						colors={["blue"]}
						yAxisWidth={30}
						customTooltip={customTooltip}
					/>
                    <Button className="">Add Measure</Button>
				</AccordionBody>
			</Accordion>
		</>
	);
};

export default Measurement;
