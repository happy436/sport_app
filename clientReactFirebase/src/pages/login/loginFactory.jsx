import React, { useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const LoginFactory = () => {
    const [signIn, setSignIn] = useState(true)
    const handleChangePageType = () => {
        setSignIn(!signIn)
    }
	switch (signIn) {
		case true:
			return (<LoginForm onChangePageType={handleChangePageType}/>)
		case false:
			return (<RegisterForm onChangePageType={handleChangePageType}/>)
	}
};

export default LoginFactory;
