import { Button, Card, Dialog, DialogPanel } from "@tremor/react";
import React, { useState } from "react";

type IconColorProps = {
	color: string;
	colorList: [];
	handleClick: () => void;
	icon: string;
};

const IconColor: React.FC<IconColorProps> = ({
	color,
	colorList,
	icon,
	handleClick,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenIcon, setIsOpenIcon] = useState(false);
	const iconList = [
		"🔥",
		"📏",
		"🍗",
		"🚶‍♂️",
		"🏃‍♂️",
		"🛌",
		"🤾‍♂️",
		"🏋️‍♂️",
		"🚴‍♂️",
		"🤸‍♂️",
		"💪",
		"✍",
        "📚",
		"🎨",
		"⚽",
		"⚾",
		"🏀",
		"🏐",
		"🎱",
		"🎯",
		"🎮",
		"♟",
		"🎤",
		"🎹",
		"📴",
		"📱",
		"🍩",
		"🍫",
		"☕",
		"🍺",
		"🚲",
		"🛴",
		"🛹",
		"🚿",
		"🔇",
		"☣",
		"👁‍🗨",
	];
	return (
		<Card>
			<div className="mb-4">
				<label
					className="block text-white text-xl font-bold mb-2"
					htmlFor="Icon & Color"
				>
					Icon & Color
				</label>
				<div className="flex items-center justify-start gap-3">
					<span className="flex gap-2 items-center justify-center">
						<p>Icon</p>
						<Button
							color={color}
							type="button"
                            onClick={() => setIsOpenIcon(true)}
							className="w-[30px] h-[30px]"
						>
							{icon || "+"}
						</Button>
						<Dialog
							open={isOpenIcon}
							onClose={(val) => setIsOpenIcon(val)}
							static={true}
						>
							<DialogPanel>
								<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
									Choose icon
								</h3>
								<ul className="flex flex-wrap gap-3">
									{iconList.map((item) => (
										<li key={item}>
											<Button
												size="xl"
												variant="primary"
												color={color}
												name="icon"
												value={item}
												type="button"
												onClick={handleClick}
                                                
											><p className="text-2xl">{item}</p></Button>
										</li>
									))}
								</ul>
								<Button
									color={color}
									className="mt-8 w-full text-white"
									onClick={() => setIsOpenIcon(false)}
									type="button"
								>
									Got it!
								</Button>
							</DialogPanel>
						</Dialog>
					</span>
					<span className="flex gap-2 items-center justify-center">
						<p>Color</p>
						<Button
							color={color}
							onClick={() => setIsOpen(true)}
							type="button"
							className="w-[30px] h-[30px] flex items-center justify-center"
						></Button>
						<Dialog
							open={isOpen}
							onClose={(val) => setIsOpen(val)}
							static={true}
						>
							<DialogPanel>
								<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
									Choose color
								</h3>
								<ul className="flex flex-wrap gap-3">
									{colorList.map((clr) => (
										<li key={clr}>
											<Button
												size="xl"
												variant="primary"
												color={clr}
												name="color"
												value={clr}
												type="button"
												onClick={handleClick}
											></Button>
										</li>
									))}
								</ul>
								<Button
									color={color}
									className="mt-8 w-full text-white"
									onClick={() => setIsOpen(false)}
									type="button"
								>
									Got it!
								</Button>
							</DialogPanel>
						</Dialog>
					</span>
				</div>
			</div>
		</Card>
	);
};
export default IconColor;
