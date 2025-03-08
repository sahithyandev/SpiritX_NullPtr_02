import NavLink from "./nav-link";
import PageTitle from "./page-title";

interface NavProps {
	title?: string;
}

export default function Nav({ title }: NavProps) {
	return (
		<nav className="flex mt-6 mb-10 justify-between items-center">
			<PageTitle>{title || "Hello Sahithyan!"}</PageTitle>

			<ul className="flex gap-4">
				<NavLink href="/">Home</NavLink>
				<NavLink href="/players">Players</NavLink>
			</ul>
		</nav>
	);
}
