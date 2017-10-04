export interface ListOfRecursiveArraysOrValues<T>
extends List<T | RecursiveArray<T>> {}
export type List<T> = ArrayLike<T>
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

export type Primitives = (
	Primitive |
	ListOfRecursiveArraysOrValues<Primitive>
)

export type Primitive = string | PrimitiveHash

export interface PrimitiveHash extends Hash<string | boolean | number> {}

export interface Hash<T> {
	[key: string]: T
}
