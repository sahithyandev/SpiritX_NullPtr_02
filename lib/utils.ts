import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function aOrAn(phrase: string) {
	if (
		phrase.startsWith("a") ||
		phrase.startsWith("e") ||
		phrase.startsWith("i") ||
		phrase.startsWith("o") ||
		phrase.startsWith("u")
	) {
		return "an ".concat(phrase);
	}
	return "a ".concat(phrase);
}

export function roundToNearestMultipleOf(
	value: number,
	multiple: number,
): number {
	return Math.round(value / multiple) * multiple;
}
