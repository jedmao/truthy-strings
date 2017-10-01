import test from 'ava'

import truthyStringsKeys from './'

test('truthyStringsKeys returns an empty array by default', t => {
	t.deepEqual(
		truthyStringsKeys(),
		[],
	)
})

test('truthyStringsKeys returns input string wrapped in an array', t => {
	t.deepEqual(
		truthyStringsKeys('foo'),
		['foo'],
	)
})

test('truthyStringsKeys splits input string by multiple spaces and newlines', t => {
	t.deepEqual(
		truthyStringsKeys(' \n  foo \r\n  bar   '),
		['foo', 'bar'],
	)
})

test('truthyStringsKeys returns a flat array from a nested string array', t => {
	t.deepEqual(
		truthyStringsKeys([
			'foo',
			['bar', [
				'baz', [
					'qux',
				],
			]],
		]),
		['foo', 'bar', 'baz', 'qux'],
	)
})

test('truthyStringsKeys returns a list of keys for which their values are truthy', t => {
	t.deepEqual(
		truthyStringsKeys({
			foo: true,
			bar: false,
			baz: 42,
			qux: 0,
		}),
		['foo', 'baz'],
	)
})

test('truthyStringsKeys omits falsey and non-string values', t => {
	const values = [
		'',
		[],
		'foo',
		true,
		false,
		42,
		undefined,
		void 0,
	]
	t.deepEqual(
		// tslint:disable-next-line:no-any
		truthyStringsKeys(values as any),
		['foo'],
	)
})

test('truthyStringsKeys returns a simple flat array from a complex nested structure', t => {
	const nested = [
		'foo', [
			{
				bar: true,
				baz: null,
			},
		],
		'qux',
		[
			[
				[
					{
						corge: undefined,
						garpley: -1,
					},
				],
			],
		],
	]
	t.deepEqual(
		// tslint:disable-next-line:no-any
		truthyStringsKeys(nested as any),
		['foo', 'bar', 'qux', 'garpley'],
	)
})

test('truthyStringsKeys returns unique values if { unique: true }', t => {
	const modifiers = [
		'foo',
		'bar',
		[
			'foo',
			'bar',
			{
				foo: true,
				bar: true,
			},
		],
	]
	t.deepEqual(
		truthyStringsKeys(modifiers),
		['foo', 'bar', 'foo', 'bar', 'foo', 'bar'],
	)
	t.deepEqual(
		truthyStringsKeys(modifiers, { unique: true }),
		['foo', 'bar'],
	)
})
