import truthyKeys from 'truthy-keys'

import { Primitives } from './types'

/**
 * Resolves a simple string or a potentially deeply nested structure of
 * primitive values into a simple string array.
 * @return Returns a simple string array of modifiers that passed resolution.
 */
export default function truthyStringsKeys(modifiers?: Primitives): string[] {
	return uniq(compact(isArray(modifiers)
		? flatten(modifiers.map(m => truthyStringsKeys(m)))
		: isString(modifiers)
			? modifiers.split(/\s+/)
			: truthyKeys(modifiers as {}),
	))
}

export function compact<T>(arr: T[]) {
	return isArray(arr) ? arr.filter(identity) : []
}

export function flatten<T>(arr: T[]) {
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
	Primitive,
	Primitives,
	PrimitiveHash,
} from './types'
