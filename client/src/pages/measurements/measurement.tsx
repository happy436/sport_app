import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AreaChart,
} from "@tremor/react";

type measurementProps = {
	_id: string;
	name: string;
	measurement: measure[];
	units: string;
};

type measure = {
	date: number;
	value: number;
};

const Measurement: React.FC<measurementProps> = ({ data }) => {
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
	return (
		<>
			
				<Accordion>
					<AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
						{data.name}
					</AccordionHeader>
					<AccordionBody className="leading-6">
						<AreaChart
							className="mt-4 h-72"
							data={data.measurements}
							index="date"
							categories={["value"]}
							colors={["blue"]}
							yAxisWidth={30}
							customTooltip={customTooltip}
						/>
					</AccordionBody>
				</Accordion>
		</>
	);
};

export default Measurement;
