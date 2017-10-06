export interface ListOfRecursiveArraysOrValues<T>
extends List<T | RecursiveArray<T>> {}
export type List<T> = ArrayLike<T>
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

export type Primitives = (
	Primitive |
	PrimitiveHash |
	ListOfRecursiveArraysOrValues<Primitive | PrimitiveHash>
)

export type Primitive = (
	string |
	number |
	boolean |
	null |
	undefined
)

export interface PrimitiveHash extends Hash<Primitive> {}

export interface Hash<T> {
	[key: string]: T
}
