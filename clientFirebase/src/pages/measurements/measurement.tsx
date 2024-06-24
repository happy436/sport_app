import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AreaChart,
	Button,
} from "@tremor/react";

type MeasurementProps = {
	data: MeasurementData;
	date: number;
	setIsOpenModal: () => void;
	setEditedCategoryId: () => void;
};

type MeasurementData = {
	_id: string;
	name: string;
	measurements: Measure[];
	units: string;
};

type Measure = {
	date: string;
	value: number;
};

const Measurement: React.FC<measurementProps> = ({
	data,
	date,
	setIsOpenModal,
	setEditedCategoryId,
}) => {
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

    function sortObjectsByDate(arr) {
        return [...arr].sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('.').map(Number);
            const [dayB, monthB, yearB] = b.date.split('.').map(Number);
    
            const dateA = new Date(`20${yearA}`, monthA - 1, dayA);
            const dateB = new Date(`20${yearB}`, monthB - 1, dayB);
    
            return dateA - dateB;
        });
    }

	const getClosestData = (data, timestamp) => {
        const sortedData = sortObjectsByDate(data)
		const targetDate = new Date(timestamp);

		const parseDate = (dateString: string): Date => {
			const [day, month, year] = dateString.split(".").map(Number);
			return new Date(year + 2000, month - 1, day);
		};

		const closestIndex = sortedData.reduce((closest, current, index) => {
			const currentDate = parseDate(current.date);
			const currentDiff = Math.abs(
				currentDate.getTime() - targetDate.getTime()
			);
			const closestDate = parseDate(sortedData[closest].date);
			const closestDiff = Math.abs(
				closestDate.getTime() - targetDate.getTime()
			);
			return currentDiff < closestDiff ? index : closest;
		}, 0);

		const start = Math.max(0, closestIndex - 6);
		const result = sortedData.slice(start, closestIndex + 1);
		return result;
	};

	return (
		<Accordion>
			<AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
				{data.name}
			</AccordionHeader>
			<AccordionBody className="leading-6 flex flex-col items-center gap-3">
				{data.measurements ? (
					<AreaChart
						className="mt-4 h-72"
						data={getClosestData(data.measurements, date)}
						index="date"
						categories={["value"]}
						colors={["blue"]}
						yAxisWidth={30}
						customTooltip={customTooltip}
					/>
				) : (
					"Empty"
				)}
				<Button
					className=""
					onClick={() => {
						setIsOpenModal((prev) => ({
							...prev,
							addMeasure: true,
						}));
						setEditedCategoryId(data._id);
					}}
				>
					Add Measure
				</Button>
			</AccordionBody>
		</Accordion>
	);
};

export default Measurement;
