import React, { useState } from "react";
import { loginField } from "./loginForm";
import { Button, Card, TextInput } from "@tremor/react";
import { signUp } from "../../store/users"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type RegisterFormProps = {
	onChangePageType: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onChangePageType }) => {
	const dispatch = useDispatch()
    const navigate = useNavigate()
    const [handleInput, setHandleInput] = useState<loginField>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);
	const validation = () => {
		// TODO validation and add toastify
		const error = [];
		setErrors([]);
		if (handleInput.email === "") {
			setErrors((prev) => [...prev, "email"]);
			error.push(["email"]);
		}
		if (handleInput.password === "") {
			setErrors((prev) => [...prev, "password"]);
			error.push("tepasswordxt");
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
		const { email, password } = handleInput;
		dispatch(signUp({email, password}))
        navigate('/home')
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
									error={errors.includes("email")}
									errorMessage="his field is required!"
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