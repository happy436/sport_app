import React from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

type LoginFactoryProps = {
	signIn: boolean;
};

const LoginFactory: React.FC<LoginFactoryProps> = ({ signIn }) => {
	switch (signIn) {
		case true:
			return (<LoginForm/>)
		case false:
			return (<RegisterForm/>)
	}
};
export default LoginFactory;
