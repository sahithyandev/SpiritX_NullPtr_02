interface StatsCardProps {
	value: number | string;
	title: string;
	variant?: "default" | "link";
	valueElementId?: string;
}

export function StatsCard({
	value,
	title,
	variant,
	valueElementId,
}: StatsCardProps) {
	return (
		<div
			className={`flex min-w-[150px] flex-auto flex-row items-center bg-background border-red-50/50 border-[2px] justify-center gap-1 rounded-md px-3 py-3 text-center md:flex-col md:gap-0.5 ${variant === "link" ? "border-4 border-primary" : ""}`}
		>
			<span className="max-w-max whitespace-nowrap">{title}</span>
			<strong className="text-xl md:text-3xl" id={valueElementId}>
				{value.toLocaleString("en-GB")}
			</strong>
		</div>
	);
}
