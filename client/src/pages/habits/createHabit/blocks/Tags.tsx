import { Button, Card, Dialog, DialogPanel, TextInput } from "@tremor/react";
import React, { useEffect, useState } from "react";

type TagsProps = {
	tags: string[];
	color: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Указываем тип функции onChange
};

const Tags: React.FC<TagsProps> = ({ tags, color, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tagName, setTagName] = useState("");
	useEffect(() => {
		if (tags.length !== 0) {
			setTagName(tags.join(" "));
		}
	}, []);
	const handleClick = () => {
		onChange({ target: { name: "tags", value: tagName !== "" ? tagName.split(" ") : [] } });
	};
    const handleDelete = (tag:string) => {
        const newTags = tags.filter(el => el !== tag)
        onChange({ target: { name: "tags", value: newTags } });
        setTagName(newTags.join(" "))
    }
	return (
		<Card>
			<div className="mb-4">
				<label
					className="block text-white text-xl font-bold mb-2"
					htmlFor="tag"
				>
					Tags
				</label>
				<ul className="flex gap-2 flex-wrap">
					{tags.map((tag: string) => (
						<li key={tag}>#{tag}</li>
					))}
				</ul>
				<Button
					color={color}
					onClick={() => setIsOpen(true)}
					type="button"
					className="w-[30px] h-[30px] flex items-center justify-center"
				>
					+
				</Button>
			</div>
			<Dialog
				open={isOpen}
				onClose={(val) => setIsOpen(val)}
				static={true}
			>
				<DialogPanel className="flex flex-col gap-2">
					<h3 className="text-lg mb-3 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
						Input tags
					</h3>
					<TextInput
						type="text"
						value={tagName}
						name="tags"
						onValueChange={(value) => setTagName(value)}
						placeholder="tags: sport workout dumble"
					/>
					<ul className="flex gap-2 flex-wrap">
						{tags.map((tag: string) => (
							<li key={tag}>
								<div
									className={`flex gap-2 items-center bg-${color}-600 w-max rounded-xl text-white p-2`}
								>
									<p>#{tag}</p>
									<Button
										color={color}
										className="p-2"
										onClick={() => {
											handleDelete(tag)
										}}
									>
										x
									</Button>
								</div>
							</li>
						))}
					</ul>
					<Button
						color={color}
						className=" w-full text-white"
						onClick={() => {
							handleClick();
							setIsOpen(false);
						}}
						type="button"
					>
						Got it!
					</Button>
				</DialogPanel>
			</Dialog>
		</Card>
	);
};
export default Tags;
