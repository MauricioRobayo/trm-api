import { AxiosResponse } from 'axios';

const data = [
  {
    valor: '643.42',
    unidad: 'COP',
    vigenciadesde: '1991-12-02T00:00:00.000',
    vigenciahasta: '1991-12-02T00:00:00.000',
  },
  {
    valor: '639.22',
    unidad: 'COP',
    vigenciadesde: '1991-12-03T00:00:00.000',
    vigenciahasta: '1991-12-03T00:00:00.000',
  },
  {
    valor: '635.70',
    unidad: 'COP',
    vigenciadesde: '1991-12-04T00:00:00.000',
    vigenciahasta: '1991-12-04T00:00:00.000',
  },
  {
    valor: '631.51',
    unidad: 'COP',
    vigenciadesde: '1991-12-05T00:00:00.000',
    vigenciahasta: '1991-12-05T00:00:00.000',
  },
  {
    valor: '627.16',
    unidad: 'COP',
    vigenciadesde: '1991-12-06T00:00:00.000',
    vigenciahasta: '1991-12-06T00:00:00.000',
  },
];

const axiosResponse: AxiosResponse = {
  data,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

// axios mocked
export default {
  // Typescript requires a 'default'
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
};
