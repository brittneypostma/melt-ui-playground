import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
type ClassValue = string | number | boolean | ClassArray | ClassDictionary | null | undefined

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
