import { ComponentPropsWithoutRef, FC } from "react";
import classNames from "classnames";

interface PageProps extends ComponentPropsWithoutRef<"div"> {}

const PageTitle: FC<PageProps> = ({ children }) => {
	return (
		<div>
			<h1 className="text-5xl font-bold">{children}</h1>
		</div>
	);
};

const PageContent: FC<PageProps> = ({ children, className }) => {
	return (
		<div className={classNames("flex flex-col gap-3", className)}>
			{children}
		</div>
	);
};

interface PageComponent extends FC<PageProps> {
	PageTitle: FC<PageProps>;
	PageContent: FC<PageProps>;
}

const Page: PageComponent = ({ className, children }) => {
	return (
		<div  className={classNames("relative flex flex-col gap-3", className)}>
			{children}
		</div>
	);
};

Page.PageTitle = PageTitle;
Page.PageContent = PageContent;

export default Page;
