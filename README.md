# TRM API

This is a TypeScript client for the [Tasa Representativa del Mercado API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3). The `trm-api` package is a wrapper to simplify GET requests and JSON response parsing from the API.

## Install

```
npm install trm-api
```

## Usage

The `TrmApi` class provides three methods: `latest()`, `between(options)`, and `history(?options)`.

```js
const TrmApi = require('trm-api');

const trmapi = new TrmApi();
```

#### `latest()`

Provides the most recent quote:

```js
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

#### `between(options)`

Returns an array with the quotes between two dates: `startAt` and `endAt`.

The `options` argument is an object which accepts the following fields:

| Field   | Type     | Description                                                             |
| ------- | -------- | ----------------------------------------------------------------------- |
| startAt | Required | The initial date of the data to be retrieved in `YYYY-MM-DD` format.    |
| endAt   | Required | The final date of the data to be retrieved in `YYYY-MM-DD` format.      |
| ?order  | Optional | Can be 'ASC' or 'DESC'. Defaults to `DESC`, the most recent date first. |

```js
const trmapi = new TrmApi();

trmapi
  .between({ startAt: '2020-07-02', endAt: '2020-07-10' })
  .then(console.log);
```

#### `history(?options)`

Returns an array with all the values starting from the most recent value.

The `options` optional argument accepts the following fields:

| Field  | Type     | Description                                                                |
| ------ | -------- | -------------------------------------------------------------------------- |
| ?order | Optional | Can be 'ASC' or 'DESC'. Defaults to `DESC`, the most recent date first.    |
| ?limit | Optional | Maximum number of results to return. Defaults to 1,000. Maximum of 50,000. |

### TypeScript

The module is written in TypeScript and type definitions files are included.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## License

[MIT](LICENSE)
