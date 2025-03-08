import type { PropsWithChildren } from "react";
import type React from "react";

interface PageTitleProps {
	className?: string;
}

export default function PageTitle({
	children,
	className = "",
}: PropsWithChildren<PageTitleProps>) {
	return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
}
