import React, {
	type AnchorHTMLAttributes,
	type HTMLAttributes,
	type PropsWithChildren,
} from "react";

interface NavLinkProps
	extends HTMLAttributes<HTMLAnchorElement>,
		AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function NavLink({
	children,
	className,
	...otherProps
}: PropsWithChildren<NavLinkProps>) {
	return (
		<li>
			<a className={`text-lg font-semibold ${className}`} {...otherProps}>
				{children}
			</a>
		</li>
	);
}
