# TRM API

[![npm version](https://badge.fury.io/js/trm-api.svg)](https://badge.fury.io/js/trm-api)
[![build and release](https://github.com/MauricioRobayo/trm-api/workflows/build%20and%20release/badge.svg)](https://github.com/MauricioRobayo/trm-api/actions?query=workflow%3A%22Build+and+Release%22)
[![codecov](https://codecov.io/gh/MauricioRobayo/trm-api/branch/master/graph/badge.svg)](https://codecov.io/gh/MauricioRobayo/trm-api)
[![CodeFactor](https://www.codefactor.io/repository/github/mauriciorobayo/trm-api/badge)](https://www.codefactor.io/repository/github/mauriciorobayo/trm-api)

The `trm-api` package is a wrapper to simplify GET requests and JSON response parsing from the [Tasa Representativa del Mercado API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3).

## Install

```
npm install trm-api
```

## Usage

The `TrmApi` class provides three methods: `latest()`, `between(options)`, and `history(options?)`.

### CommonJS

```js
const TrmApi = require('trm-api').default;

const trmapi = new TrmApi();
```

### ES6 Modules

```js
import TrmApi from 'trm-api';

const trmapi = new TrmApi();
```

#### App Token

A limited number of requests can be made without an app token, but they are subject to much lower throttling limits than request that do include one.

With an app token, your application is guaranteed access to it's own pool of requests.

👉 [Sign up for an app token!](https://www.datos.gov.co/profile/edit/developer_settings)

![app-token](https://user-images.githubusercontent.com/2121481/90161654-11e0e280-dd59-11ea-9678-4d0a9f995b3c.png)

You can pass your app token in the constructor:

```js
const TrmApi = require('trm-api');

const trmapi = new TrmApi('YOUR-APP-TOKEN-HERE');
```

#### `latest()`

Provides the most recent quote:

```js
trmapi
  .latest()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

The response is a single object with the latest information from the [Tasa Representativa del Mercado API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3):

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

The `options` argument is an object with the following fields:

| Field   | Type     | Description                                                          |
| ------- | -------- | -------------------------------------------------------------------- |
| startAt | Required | The initial date of the data to be retrieved in `YYYY-MM-DD` format. |
| endAt   | Required | The final date of the data to be retrieved in `YYYY-MM-DD` format.   |
| order?  | Optional | Can be `'ASC'` or `'DESC'`. Defaults to `'ASC'`.                     |

```js
trmapi.trmapi
  .between({ startAt: '2020-07-02', endAt: '2020-07-7', order: 'DESC' })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Will return the following array:

```js
[
  {
    valor: '3633.32',
    unidad: 'COP',
    vigenciadesde: '2020-07-07T00:00:00.000',
    vigenciahasta: '2020-07-07T00:00:00.000',
  },
  {
    valor: '3645.90',
    unidad: 'COP',
    vigenciadesde: '2020-07-04T00:00:00.000',
    vigenciahasta: '2020-07-06T00:00:00.000',
  },
  {
    valor: '3660.18',
    unidad: 'COP',
    vigenciadesde: '2020-07-03T00:00:00.000',
    vigenciahasta: '2020-07-03T00:00:00.000',
  },
  {
    valor: '3723.67',
    unidad: 'COP',
    vigenciadesde: '2020-07-02T00:00:00.000',
    vigenciahasta: '2020-07-02T00:00:00.000',
  },
];
```

#### `history(options?)`

Returns an array with all the values starting from the most recent value.

The `options` optional argument is an object with the following fields:

| Field  | Type     | Description                                                                |
| ------ | -------- | -------------------------------------------------------------------------- |
| order? | Optional | Can be `'ASC'` or `'DESC'`. Defaults to `ASC`.                             |
| limit? | Optional | Maximum number of results to return. Defaults to 1,000. Maximum of 50,000. |

```js
trmapi
  .history({ limit: 30 })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

#### `date()`

A wrapper that extracts the first result from `between({ startAd: date, endAt: date})`.

Returns the TRM for an specific date given in `YYYY-MM-DD` format:

```js
trmapi
  .date('2020-08-10')
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

The response is a single object with the information for the given date:

```js
{
  valor: '3792.98',
  unidad: 'COP',
  vigenciadesde: '2020-08-05T00:00:00.000',
  vigenciahasta: '2020-08-05T00:00:00.000'
}
```

### TypeScript

The module is written in TypeScript and type definitions files are included.

## CLI

The packages provides a simple CLI to quickly get TRM quotes.

If called without arguments it will return the current exchange rate:

```
$ npx trm-api
3767.05
```

It can also be called with a given date in `YYYY-MM-DD` format to get the exchange rate for that date:

```
$ npx trm-api 2010-09-23
1803.71
```

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## License

[MIT](LICENSE)
