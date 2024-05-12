import { Card } from "@tremor/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

type defaultProps = {};

const Default: React.FC<defaultProps> = () => {
	const login = true;
	return (
		<>
			{login ? (
				<Link to="/profile">
					<Card>
						<p className="text-white">Profile</p>
					</Card>
				</Link>
			) : (
				<Outlet />
			)}
		</>
	);
};
export default Default;
