import React from "react";
import Page from "../components/common/page";

type habitsProps = {};

const Habits: React.FC<habitsProps> = () => {
	return (
		<Page>
			<Page.PageTitle>Habits</Page.PageTitle>
			<Page.PageContent>Content</Page.PageContent>
		</Page>
	);
};
export default Habits;
