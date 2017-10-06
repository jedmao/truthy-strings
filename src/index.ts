import truthyKeys from 'truthy-keys'

import { Primitives } from './types'

export interface TruthyStringsKeysOptions {
	/**
	 * Removes duplicate values.
	 */
	unique?: boolean
}

/**
 * Resolves a simple string or a potentially deeply nested structure of
 * primitive values into a simple string array.
 */
export default function truthyStringsKeys(
	primitives?: Primitives | Primitives[],
	{
		unique = false,
	}: TruthyStringsKeysOptions = {},
): string[] {
	const result = compact(isArray(primitives)
		? flatten(primitives.map(m => truthyStringsKeys(m, { unique })))
		: isString(primitives)
			? primitives.split(/\s+/)
			: truthyKeys(primitives as {}),
	)
	return unique ? uniq(result) : result
}

export function compact<T>(arr: T[]) {
	return isArray(arr) ? arr.filter(identity) : []
}

export function flatten<T>(arr: T[][]): T[] {
	// tslint:disable-next-line:no-any
	return (arr || []).reduce((a, b) => a.concat(b as any), [])
}

export function identity<T>(value: T) {
	return value
}

// tslint:disable-next-line:no-any
export function isArray(x: any): x is any[] {
	return Array.isArray(x)
}

// tslint:disable-next-line:no-any
export function isString(x: any): x is string {
	return typeof x === 'string'
}

export function uniq<T>(arr: T[]) {
	return arr.filter(
		// tslint:disable-next-line:no-any
		function(this: any, a: T) {
			return !this[a] ? this[a] = true : false
		},
		{},
	)
}

export {
	Hash,
	Primitive,
	Primitives,
	PrimitiveHash,
} from './types'
