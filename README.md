# cache-i-data
Cache data object and utilities for [cache-i](https://github.com/lambdadeltadot/cache-i) implementations.

## Table of Contents

* [Installation](#installation)
* [EntryData](#entrydata)
  + [constructor](#constructor)
    - [Example Usage](#example-usage)
  + [Public Properties](#public-properties)
    - [key](#key)
    - [value](#value)
    - [expiration](#expiration)
  + [Static Methods](#static-methods)
    - [parse](#parse)
  + [Instance Method](#instance-method)
    - [isExpired](#isexpired)
    - [remainingTTL](#remainingttl)
    - [serialize](#serialize)
* [Utilities](#utilities)
  + [isValidDate](#isvaliddate)
  + [offsetFromNow (offset)](#offsetfromnow)
  + [parseTTL](#parsettl)
* [Tests](#tests)
* [Contributing](#contributing)

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

The `EntryData` class stores the data about an cache entry, which includes the `value`, and `expiration` of the entry data.

### constructor

```
constructor (value, ttl)
```

Creates an instance of Entry Data.

- **Generic Type** `{T}`: The type of the value to be saved.
- **Param** `{T} value`: The value to be bound to this entry data.
- **Param** `{null|number|Date} ttl`: The time to live in milliseconds if number, the expiration date if Date, or no expiration if null.
- **Throws** `{TypeError}`: when the ttl has an invalid type or format

#### Example Usage

Creates an entry with key and value that expires on `January 1, 2020 00:00:00`:

```js
const EntryData = require('@lambdadeltadot/cache-i-data');
const entry = new EntryData('value', new Date('2020-01-01 00:00:00'));
```

Creates an entry with key and value that expires after 10 seconds.

```js
const EntryData = require('@lambdadeltadot/cache-i-data');
const entry = new EntryData('value', 10 * 1000);
```

Creates an entry with key and value that expires after 10 seconds using numeric string.

```js
const EntryData = require('@lambdadeltadot/cache-i-data');
const entry = new EntryData('value', '10000');
```

Creates an entry with key and value that does not expires.

```js
const EntryData = require('@lambdadeltadot/cache-i-data');
const entry = new EntryData('value', null);
```

You can pass anything to the value parameter.

```js
const EntryData = require('@lambdadeltadot/cache-i-data');
const entry = new EntryData({ a: 1 }, null);
```

### Public Properties

#### value

The value bound to this entry.

- **Type** `{T}`

#### expiration

The expiration of this entry data.

- **Type** `{null|Date}`

### Static Methods

Below are the static methods of this class:

#### parse

```
Entry.parse(text)
```

Parses the text into a EntryData instance.

- **Generic Type** `{T}`: The type of the value for the parsed data.
- **Param** `{string} text`: The text to parse.
- **Returns** `{EntryData<T>}`: The parsed entry data.
- **Throws** `{TypeError}`: when any of parsed data has invalid type or format

```js
const EntryData = require('@lambdadeltadot/cache-i-data');

const data = new EntryData('key', 'value', new Date());
const text = data.serialize();

const parsedData = EntryData.parse(text);
```

### Instance Method

Below are the instance methods of this class:

#### isExpired

```
EntryData.prototype.isExpired()
```

Checks if this data is already expired.

- **Returns** `{boolean}`: true if expiration date already past now, otherwise false, always return false if expiration is null

```js
if (data.isExpired()) {
  console.log('data already expired');
}
```

#### remainingTTL

```
EntryData.prototype.remainingTTL()
```

Get the difference in milliseconds between the expiration date and now.

- **Returns** `{null|number}`: the remaining ttl in milliseconds, or null if does not expire

```js
const data = new EntryData('key', 'value', 20 * 1000);
const data2 = new EntryData('key2', 'value2', data.remainingTTL());
```

#### serialize

```
EntryData.prototype.serialize()
```

Converts this data into a serialized string. Note that this uses `JSON.stringify` under the hood, so make sure the value for this data is serializable by it.

- **Returns** `{string}`

```js
const data = new EntryData('key', 'value', new Date());
Cache.set(data.key, data.serialize(), data.remainingTTL());
```

## Utilities

This are the utilities function that you can use.
### isValidDate

```
isValidDate(date)
```

Checks if the given date object has a valid value.

- **Param** `{Date} date`: the date to check
- **Returns** `{boolean}`: true if it is a valid date, otherwise false

```js
const isValidDate = require('@lambdadeltadot/cache-i-data/isValidDate');
console.log(isValidDate(new Date())); // true
console.log(isValidDate(new Date(NaN)); // false
```

### offsetFromNow

```
offsetFromNow(offset)
```

Get the date with the given offset from now.

- **Param** `{number} offset`: the offset in milliseconds
- **Returns** `{Date}`: the date with offset from now

```js
const offsetFromNow = require('@lambdadeltadot/cache-i-data/offsetFromNow');
console.log(offsetFromNow(10 * 1000)); // 10 seconds from now
```

### parseTTL

```
parseTTL(ttl)
```

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
