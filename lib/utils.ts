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

export function displayPlayerCategory(category: string) {
	const words = category.split("_");
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		words[i] = word.charAt(0).toUpperCase().concat(word.slice(1));
	}

	return words.join(" ");
}
