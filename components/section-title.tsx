import type { PropsWithChildren } from "react";
import type React from "react";

interface PageTitleProps {
	className?: string;
}

export default function SectionTitle({
	children,
	className = "",
}: PropsWithChildren<PageTitleProps>) {
	return (
		<h2 className={`mt-5 mb-2 text-3xl font-bold ${className}`}>{children}</h2>
	);
}
