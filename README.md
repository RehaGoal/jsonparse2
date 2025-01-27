# Async JSONparse2

Fast library to parse a JSON stream asynchronously using utf-8 encoding in Node.js, Deno or any modern browser. Fully compliant with the JSON spec and `JSON.parse(...)`.

*tldr;*

```javascript
import { JSONparser } from 'jsonparse2';

const parser = new JSONparser();
parser.onValue = async (value) => { /* process data */}

// Or passing the stream in several chunks 
try {
  await p.write('{ "test": ["a"] }');
  // onValue will be called 3 times:
  // "a"
  // ["a"]
  // { test: ["a"] }
} catch (err) {
  console.log(err); // handler errors 
}
```

## Dependencies / Polyfilling

JSONparse2 requires a few ES6 classes:

* [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
* [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
* [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)

If you are targeting browsers or systems in which these might be missing, you need to polyfil them.

## Components

### Tokenizer

A JSON compliant tokenizer that parses a utf-8 stream into JSON tokens

```javascript
import { Tokenizer } from 'jsonparse2';

const tokenizer = new Tokenizer(opts);
```

The available options are:

```javascript
{
  stringBufferSize: <bufferSize>, // set to 0 to don't buffer. Min valid value is 4.
  numberBufferSize: <bufferSize>, // set to 0 to don't buffer
}
```

If buffer sizes are set to anything else than zero, instead of using a string to apppend the data as it comes in, the data is buffered using a TypedArray. A reasonable size could be `64 * 1024` (64 KB).

### Buffering

When parsing strings or numbers, JSONparse2 needs to gather the data in-memory until the whole value is ready.

Strings are inmutable in Javascript so every string operation creates a new string. The V8 engine, behind Node, Deno and most modern browsers, performs a many different types of optimization. One of this optimizations is to over-allocate memory when it detects many string concatenations. This increases significatly the memory consumption and can easily exhaust your memory when parsing JSON containing very large strings or numbers. For those cases, JSONparse2 can buffer the characters using a TypedArray. This requires encoding/decoding from/to the buffer into an actual string once the value is ready. This is done using the `TextEncoder` and `TextDecoder` APIs. Unfortunately, these APIs creates a significant overhead when the strings are small so should be used only when strictly necessary.

#### Methods

* **write(data: string|typedArray|buffer): Promise<void>** push data into the tokenizer
* **onToken(token: TokenType, value: any, offset: number): Promise<void>** no-op method that the user should override to follow the tokenization process.
* **parseNumber(numberStr)** method used internally to parse numbers. By default, it is equivalent to `Number(numberStr)` but the user can override it if he wants some other behaviour.
 
```javascript
// You can override "parseNumber" and "onToken" by creating your own class extending Tokenizer
class MyTokenizer extends Tokenizer {
  parseNumber(numberStr) {
    const number = super.parseNumber(numberStr);
    // if number is too large. Just keep the string.
    return Number.isFinite(numberStr)) ? number : numberStr;
  }
  async onToken(token: TokenType, value: any) {
    if (token = TokenTypes.NUMBER && typeof value === 'string') {
      super(TokenTypes.STRING, value);
    } else {
      super(token, value);
    }
  }
}

const myTokenizer = new MyTokenizer();

// or just overriding it
const tokenizer = new Tokenizer();
tokenizer.parseNumber = (numberStr) => { ... };
tokenizer.onToken = async (token, value, offset) => { ... };
```

### Parser

A parser that processes JSON tokens as emitted by the `Tokenizer` and emits JSON values/objects.

```javascript
import { Parser } from 'jsonparse2';

const parser = new Parser();
```

It takes no options.

#### Methods

* **write(token: TokenType, value: any): Promise<void>** push data into the tokenizer
* **onValue(value: any): Promise<void>** no-op method that the user should override to get the parsed value.
 
```javascript
// You can override "onToken" by creating your own class extending Tokenizer
class MyParser extends Parser {
  async onValue(value: any) {
    // ...
  }
}

const myParser = new MyParser();

// or just overriding it
const parser = new Parser();
parser.onValue = async (value) => { ... };
```

### JSONparse

A drop-in replacement of `JSONparse` (with few ~~breaking changes~~ improvements. See below.).


```javascript
import { JsonParser } from 'jsonparse2';

const parser = new JsonParser();
```

It takes the same options as the tokenizer.

This class is just for convenience. In reality, it simply connects the tokenizer and the parser:

```javascript
const tokenizer = new Tokenizer(opts);
const parser = new Parser();
tokenizer.onToken = this.parser.write.bind(this.parser);
parser.onValue = async (value) => { /* Process values */ }
```

#### Methods

* *write(token: TokenType, value: any): Promise<void>* alias to the Tokenizer write method
* *onToken(token: TokenType, value: any, offset: number): Promise<void>* alias to the Tokenizer onToken method (write only)
* *onValue(value: any): Promise<void>* alias to the Parser onValue method (write only)
 
```javascript
// You can override "onToken" by creating your own class extending Tokenizer
class MyJsonParser extends JsonParser {
  async onToken(value: any) {
    // ...
  }
  async onValue(value: any) {
    // ...
  }
}

const myJsonParser = new MyJsonParser();

// or just overriding it
const jsonParser = new JsonParser();
jsonParser.onToken = async (token, value, offset) => { ... };
jsonParser.onValue = async (value) => { ... };
```

## Using JSONparse2

You can use both components independently as

```javascript
const tokenizer = new Tokenizer(opts);
const parser = new Parser();
this.tokenizer.onToken = this.parser.write.bind(this.parser);
```

You push data using the `write` method which takes a string or an array-like object.

You can subscribe to the resulting data using the 

```javascript
import { JsonParser } from 'jsonparse2';

const parser = new JsonParser({ stringBufferSize: undefined });
parser.onValue = console.log;

await parser.write('"Hello world!"'); // logs "Hello world!"

// Or passing the stream in several chunks 
await parser.write('"');
await parser.write('Hello');
await parser.write(' ');
await parser.write('world!');
await parser.write('"');// logs "Hello world!"
```

Write is always a synchronous operation so any error during the parsing of the stream will be thrown during the write operation. After an error, the parser can't continue parsing.

```javascript
import { JsonParser } from 'jsonparse2';

const parser = new JsonParser({ stringBufferSize: undefined });
parser.onValue = async (...args) => {console.log(...args)};

// Or passing the stream in several chunks 
try {
  await parser.write('"""');
} catch (err) {
  console.log(err); // logs 
}
```

## Examples

### Stream-parsing a fetch request returning a JSONstream

Imagine an endpoint that send a large amount of JSON objects one after the other (`{"id":1}{"id":2}{"id":3}...`).

```js
  import { JSONparser } from 'jsonparse2';

  const jsonparser = new JsonParser({ stringBufferSize: undefined });
  parser.onValue = async (value, key, parent, stack) => {
	if (stack > 0) return; // ignore inner values
    // TODO process element
  }

  const response = await fetch('http://example.com/');
  const reader = response.body.getReader();
  while(true) {
    const { done, value } = await reader.read();
    if (done) break;
    await jsonparse.write(value);
  }
```


### Stream-parsing a fetch request returning a JSON array

Imagine an endpoint that send a large amount of JSON objects one after the other (`[{"id":1},{"id":2},{"id":3},...]`).

```js
  import { JsonParser } from 'jsonparse2';

  const jsonparser = new JsonParser({ stringBufferSize: undefined });
  parser.onValue = async (value, key, parent, stack) => {
    if (stack.length === 0) /* We are done. Exit. */; 
    if (stack > 1) return; // ignore inner values
    // By default, JSONparse2 keeps all the child elements in memory until the root parent is emitted.
    // Let's delete the objects after processing them in order to optimize memory.
    delete parent[key];
    // TODO process `value`
  }

  const response = await fetch('http://example.com/');
  const reader = response.body.getReader();
  while(true) {
    const { done, value } = await reader.read();
    if (done) break;
    await jsonparse.write(value);
  }
```

## Why building this if we have JSONparse

JSONParser was awesome.... in 2011.

JSONparse2 is:

* **More than twice as fast.**
* **Works on the browser.**
* Well documented
* Better designed and more plugable/configurable by clearly separates the tokenizer and parser processes.
* Simpler and cleaner code. Uses ES6 and doesn't rely on deprecated Node.js method.
* 100% unit test coverage.
* Fully compliant with the JSON spec. You will always get the same result as using `JSON.parse()`.
* Now asynchronous, so parsing/tokenization can be delayed until a Promise has finished (e.g. IndexedDB queries).


### Breaking changes compared to JSONparse

* Big number are not kept as a string by default. you can achieve such behaviour by simply overriding the `parseNumber` method.
* Characters above 244 are correctly parsed instead of throwing an error.
* Trailing comas are not allowed in objects or arrays.
* JSONparse uses a string as internal buffer by default. This offers better performance but can lead to memory exhaustion if your JSON include very long strings (due to V8 optimizations). To get the exact same behaviour as in JSON parse you should set the `stringBufferSize` to `64 * 1024`.
* JSONparse is asynchronous, therefore calls to be write need to be `await`ed or chained via `Promise`s. Furthermore the `onToken`/`onValue` callbacks should return a `Promise`.
* JSONparse is asynchronous, therefore calls to be write need to be `await`ed or chained via `Promise`s. Furthermore the `onToken`/`onValue` callbacks should return a `Promise`.
