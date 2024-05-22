import { TextInput } from "@tremor/react";

function TextField({ name, onChange, placeholder }) {
	return (
		<div className="mb-4">
			<label
				className="block text-white text-xl font-bold mb-2"
				htmlFor={name}
			>
				{name[0].toUpperCase() + name.slice(1)}
			</label>
				<TextInput
					className="w-full"
					id={name}
					name={name}
					type="text"
					placeholder={placeholder || name}
					onChange={onChange}
                    required 
				/>
		</div>
	);
}

export default TextField;
