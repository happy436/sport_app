import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/users";
import { useNavigate } from "react-router-dom";

type logOutProps = NonNullable<unknown>

const LogOut: React.FC<logOutProps> = () => {
	const dispatch = useDispatch();
	const auth = getAuth();
    const navigation = useNavigate()
	signOut(auth)
		.then(() => {
			dispatch(logOut());
            navigation("/")
		})
		.catch((error) => {
            console.log(error)
			// An error happened.
		});
	return <div>Loading...</div>;
};
export default LogOut;
