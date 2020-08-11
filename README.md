# TRM API

This is a TypeScript client for the [Tasa Representativa del Mercado API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3). The `trm-api` package is a wrapper to simplify GET requests and JSON response parsing from the API.

## Install

```
npm install trm-api
```

## Usage

Instantiate the `TrmApi` class, which provides two methods: `latest()` and `between({startAt: string, endAt: string})`.

#### `latest()`

Provides the most recent quote:

```js
const trmapi = new TrmApi();

trmapi.latest().then(console.log);
```

The response is an object with the latest information from the [Tasa Representativa del Mercado API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3):

```js
{
  valor: '3792.98',
  unidad: 'COP',
  vigenciadesde: '2020-08-05T00:00:00.000',
  vigenciahasta: '2020-08-05T00:00:00.000'
}
```

#### `between()`

Returns an array with the quotes between two dates: `startAt` and `endAt`.

```js
const trmapi = new TrmApi();

trmapi
  .between({ startAt: '2020-07-02', endAt: '2020-07-02' })
  .then(console.log);
```

### TypeScript

The module is written in TypeScript and type definitions files are included.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## License

[MIT](LICENSE)
