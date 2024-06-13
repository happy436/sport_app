import React, { useState } from "react";
import { loginField } from "./loginForm";
import { Button, Card, TextInput } from "@tremor/react";

type RegisterFormProps = {
	onChangePageType: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onChangePageType }) => {
	const [handleInput, setHandleInput] = useState<loginField>({
		name: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);
	const validation = () => {
		// TODO validation and add toastify
		const error = [];
		setErrors([]);
		if (handleInput.name === "") {
			setErrors((prev) => [...prev, "name"]);
			error.push(["select"]);
		}
		if (handleInput.password === "") {
			setErrors((prev) => [...prev, "password"]);
			error.push("text");
		}
		if (error.length > 0) {
			return false;
		}
		return true;
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = { [e.target.name]: e.target.value };
		setHandleInput((prev) => ({ ...prev, ...input }));
	};
	const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		validation();
	};
	return (
		<>
			<div className="w-screen h-screen flex justify-center items-center">
				<div>
					<form>
						<Card className="flex gap-3 flex-col">
							<h2 className="self-center font-bold text-3xl">
								Sport App
							</h2>
							<div className="flex flex-col gap-2">
								<label>Name</label>
								<TextInput
									error={errors.includes("name")}
									errorMessage="This field is required!"
									type="text"
									name="name"
									placeholder="Enter your name"
									onChange={(e) => {
										handleChange(e);
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label>Password</label>
								<TextInput
									error={errors.includes("password")}
									errorMessage="This field is required!"
									placeholder="Enter your password"
									type="password"
									name="password"
									onChange={(e) => {
										handleChange(e);
									}}
								/>
							</div>
							<Button
								type="submit"
								className="font-bold"
								onClick={(e) => {
									submit(e);
								}}
							>
								Sign Up
							</Button>
							<span className="flex gap-1">
								<p>Already have account?</p>
								<p
									className="font-bold underline underline-offset-1 cursor-pointer"
									onClick={onChangePageType}
								>
									Sign In
								</p>
							</span>
						</Card>
					</form>
				</div>
			</div>
		</>
	);
};
export default RegisterForm;
