import { Button } from "@tremor/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import maskote from "../assets/img/1.png";
import { RiMenuFoldLine, RiMenuLine } from "@remixicon/react";

const AsideMenu = () => {
	const location = useLocation();
	const linksArray = [
		{ url: "/home", name: "Home" },
		{ url: "/measurements", name: "Measurements" },
		{ url: "/habits", name: "Habits" },
		/* { url: "/workouts", name: "Workouts" },
		{ url: "/settings", name: "Settings" }, */
		{ url: "/logOut", name: "Log Out" },
	];
    const [activeMenu, setActiveMenu] = useState(false)
    const handleActiveMenu = () => {
        setActiveMenu(!activeMenu)
    }
	// TODO delete
	const avatar = maskote;
	return (
        <>
        <Button icon={!activeMenu? RiMenuLine : RiMenuFoldLine} className={`min-sm:hidden w-min h-min absolute top-[20px] ${activeMenu ? `left-[170px]` : "left-[10px]"}`} onClick={() => handleActiveMenu()}/>
		<aside className={`bg-slate-900 w-200px p-4 h-full flex flex-col gap-3 pt-[50px] ${activeMenu ? `max-sm:` : `max-sm:hidden`} z-20 fixed`}>
			<div className="rounded-full overflow-hidden w-32 h-32">
				<img src={avatar} className="w-full h-full object-cover" />
			</div>
			<nav>
				<ul className="flex flex-col gap-3">
					{linksArray.map((link) => (
						<li key={link.name}>
							<Link to={link.url}>
								<Button
									variant={
										location.pathname === link.url
											? "primary"
											: "light"
									}
								>
									{link.name}
								</Button>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
        </>
	);
};
export default AsideMenu;
