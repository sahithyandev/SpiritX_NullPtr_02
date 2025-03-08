import React, { type PropsWithChildren } from "react";

interface NavLinkProps {
	href: string;
	className?: string;
	target?: string;
	rel?: string;
}

export default function NavLink({
	children,
	href,
	className,
	target,
	rel,
}: PropsWithChildren<NavLinkProps>) {
	return (
		<li>
			<a
				href={href}
				className={`text-xl font-semibold ${className}`}
				target={target}
				rel={rel}
			>
				{children}
			</a>
		</li>
	);
}
