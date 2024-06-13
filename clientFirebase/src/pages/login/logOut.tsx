import React from "react";
import { getAuth, signOut } from "firebase/auth";

type logOutProps = {};

const logOut: React.FC<logOutProps> = () => {
	
	const auth = getAuth();
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
	return <div>Loading...</div>;
};
export default logOut;
