import { Button, Card, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onChangePageType }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [handleInput, setHandleInput] = useState({
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
		}
		if (handleInput.password === "") {
			setErrors((prev) => [...prev, "password"]);
		}
		if (error.length > 0) {
			return false;
		}
		return true;
	};
	const handleChange = (e) => {
		const input = { [e.target.name]: e.target.value };
		setHandleInput((prev) => ({ ...prev, ...input }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!validation()) return;
			(await dispatch(logIn({ payload: handleInput }))) &&
				navigate("/home");
		} catch (error) {
			console.log(error);
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
								Login
							</h3>
							<div className="flex flex-col gap-2">
								<label>Email</label>
								<TextInput
									error={errors.includes("email")}
									errorMessage="This field is required!"
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
									handleSubmit(e);
								}}
							>
								Sign In
							</Button>
							<span className="flex gap-1">
								<p>Don't have an account?</p>
								<p
									className="font-bold underline underline-offset-1 cursor-pointer"
									onClick={() => onChangePageType()}
								>
									Sign Up
								</p>
							</span>
						</Card>
					</form>
				</div>
			</div>
		</>
	);
};
export default LoginForm;
