import React, { useState } from "react";
import { loginField } from "./loginForm";
import { Button, Card, TextInput } from "@tremor/react";
import { signUp } from "../../store/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type RegisterFormProps = {
	onChangePageType: () => void;
};

type errorField = {
	email?: string;
	password?: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onChangePageType }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [handleInput, setHandleInput] = useState<loginField>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<errorField>({});
	const validation = () => {
		// TODO validation and add toastify
		const newErrors: errorField = {};

		// Check if email is empty or invalid
		if (handleInput.email === "") {
			newErrors.email = "This field is required";
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(handleInput.email)) {
			newErrors.email = "Email must be in the form {name}@{domain}";
		}

		// Check if password is empty or less than 6 characters
		if (handleInput.password === "") {
			newErrors.password = "This field is required";
		} else if (handleInput.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
		}
		setErrors(newErrors);

		// Return true if there are no errors
		return Object.keys(newErrors).length === 0;
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = { [e.target.name]: e.target.value };
		setHandleInput((prev) => ({ ...prev, ...input }));
	};
	const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const isValid = validation();
		if (isValid) {
			const { email, password } = handleInput;
			(await dispatch(signUp({ email, password }))) && navigate("/home");
		}
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
							<h3 className="self-center font-bold text-2xl">
								Registration
							</h3>
							<div className="flex flex-col gap-2">
								<label>Name</label>
								<TextInput
									error={Object.keys(errors).includes(
										"email"
									)}
									errorMessage={errors.email}
									type="email"
									name="email"
									placeholder="Enter your email"
									onChange={(e) => {
										handleChange(e);
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label>Password</label>
								<TextInput
									error={Object.keys(errors).includes(
										"password"
									)}
									errorMessage={errors.password}
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
