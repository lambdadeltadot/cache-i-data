# cache-i-data
Cache data object and utilities for [cache-i](https://github.com/lambdadeltadot/cache-i) implementations.

## Installation

Using `npm`:

```bash
npm install @lambdadeltadot/cache-i-data
```

Using `yarn`:

```bash
yarn add @lambdadeltadot/cache-i-data
```

## EntryData

The `EntryData` class stores the data about an cache entry, which includes the `key`, `value`, and `expiration` of the entry data.

### constructor (key, value, ttl)

Creates an instance of Entry Data.

- **Param** `{string} key`: the key for this entry
- **Param** `{any} value`: the value to be saved to the cache
- **Param** `{null|number|Date} ttl`: the expiration date, or the time to live in milliseconds, or null if does not expire
- **Throws** `{TypeError}`: when any of parsed data has invalid type or format

#### Example Usage

Creates an entry with key and value that expires on `January 1, 2020 00:00:00`:

```js
const EntryData = require('@lambdadelta/cache-i');
const entry = new EntryData('key', 'value', new Date('2020-01-01 00:00:00'));
```

Creates an entry with key and value that expires after 10 seconds.

```js
const EntryData = require('@lambdadelta/cache-i');
const entry = new EntryData('key', 'value', 10 * 1000);
```

Creates an entry with key and value that does not expires.

```js
const EntryData = require('@lambdadelta/cache-i');
const entry = new EntryData('key', 'value', null);
```

You can pass anything to the value parameter.

```js
const EntryData = require('@lambdadelta/cache-i');
const entry = new EntryData('key', { a: 1 }, null);
```

The key will always be converted to string.

```js
const EntryData = require('@lambdadelta/cache-i');

const numberKey = new EntryData(1, { a: 1 }, null);
console.log(numberKey.key); // '1'

const nullKey = new EntryData(null, { a: 1 }, null);
console.log(nullKey.key); // 'null'

const objectKey = new EntryData({}, { a: 1 }, null);
console.log(objectKey.key); // '[object Object]'

const undefinedKey = new EntryData(undefined, { a: 1 }, null);
console.log(objectKey.key); // 'undefined'
```

### Public Properties

#### key

The key for this entry.

- **Type** `{string}`

#### value

The value of this entry.

- **Type** `{any}`

#### expiration

The expiration date for the entry.

- **Type** `{null|Date}`

### Static Methods

Below are the static methods of this class:

#### parse (text)

Parses the serialized string into an Entry Data.

- **Param** `{string} text`: the serialized string to parse
- **Returns** `{EntryData}`: the parsed entry data instance
- **Throws** `{TypeError}`: when any of parsed data has invalid type
- **Throws** `{Error}`: when the parsed expiration string is not a valid ISO date string

```js
const EntryData = require('@lambdadelta/cache-i');

const data = new EntryData('key', 'value', new Date());
const text = data.serialize();

const parsedData = EntryData.parse(text);
```

### Instance Method

Below are the instance methods of this class:

#### isExpired ()

Checks if this data already expired.

- **Returns** `{boolean}`: true if expiration date already past now, otherwise false, also return false if expiration is null

```js
if (data.isExpired()) {
  console.log('data already expired');
}
```

#### remainingTTL ()

Get the difference in milliseconds between the expiration date and now.

- **Returns** `{null|number}`: the remaining TTL in milliseconds, or null if no expiration

```js
const data = new EntryData('key', 'value', 20 * 1000);
const data2 = new EntryData('key2', 'value2', data.remainingTTL());
```

#### serialize ()

Convert this data into serializable string. Note that this uses `JSON.stringify` so make sure that the value of this data is serializable by it.

- **Returns** `{string}`

```js
const data = new EntryData('key', 'value', new Date());
Cache.set(data.key, data.serialize(), data.remainingTTL() / 1000);
```

## Utilities

This are the utilities function that you can use on implementations.

### isValidDate (date)

Checks if the given date object has a valid value.

- **Param** `{Date} date`: the date to check
- **Returns** `{boolean}`: true if it is a valid date, otherwise false

```js
const isValidDate = require('@lambdadeltadot/cache-i-data/isValidDate');
console.log(isValidDate(new Date())); // true
console.log(isValidDate(new Date(NaN)); // false
```

### offsetFromNow (offset)

Get the date with the given offset from now.

- **Param** `{number} offset`: the offset in milliseconds
- **Returns** `{Date}`: the date with offset from now

```js
const offsetFromNow = require('@lambdadeltadot/cache-i-data/offsetFromNow');
console.log(offsetFromNow(10 * 1000)); // 10 seconds from now
```

### parseTTL (ttl)

Parses the given TTL into an expiration date.

- **Param** `{any} ttl`: the TTL to parse
- **Returns** `{null|Date}`: the expiration date, or null if given is null
- **Throws** `{TypeError}`: when ttl has invalid type or format

```js
const parseTTL = require('@lambdadeltadot/cache-i-data/parseTTL');
console.log(parseTTL(new Date().toISOString()));
console.log(parseTTL(10000));
console.log(parseTTL(null));
```

## Tests

```
npm run test
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
