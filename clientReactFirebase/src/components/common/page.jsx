import classNames from "classnames";

const PageTitle = ({ children }) => {
	return (
		<div>
			<h1 className="text-5xl font-bold">{children}</h1>
		</div>
	);
};

const PageContent = ({ children, className }) => {
	return (
		<div className={classNames("flex flex-col gap-3", className)}>
			{children}
		</div>
	);
};

const Page = ({ className, children }) => {
	return (
		<div  className={classNames("relative flex flex-col gap-3", className)}>
			{children}
		</div>
	);
};

Page.PageTitle = PageTitle;
Page.PageContent = PageContent;

export default Page;
