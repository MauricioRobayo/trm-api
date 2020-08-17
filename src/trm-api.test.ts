import axios from 'axios';
import TrmApi from './trm-api';

afterEach(() => {
  jest.clearAllMocks();
});

it('should call the API to get the latest data', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.latest();
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24limit=1&%24order=vigenciahasta+DESC',
    { headers: {} }
  );
  expect(data).toMatchObject({
    valor: expect.any(String),
    vigenciadesde: expect.any(String),
    vigenciahasta: expect.any(String),
    unidad: expect.any(String),
  });
});

it('should call the API to get the data between two dates sorted ASC by default', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.between({
    startAt: '1991-12-02',
    endAt: '1991-12-02',
  });
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24where=%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3E%3D+%271991-12-02%27+AND+vigenciahasta+%3C%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29&%24order=vigenciadesde+ASC',
    { headers: {} }
  );
  expect(Array.isArray(data)).toBe(true);
});

it('should call the API to get the data between two dates sorted DESC', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.between({
    startAt: '1991-12-02',
    endAt: '1991-12-02',
    order: 'DESC',
  });
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24where=%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3E%3D+%271991-12-02%27+AND+vigenciahasta+%3C%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29&%24order=vigenciadesde+DESC',
    { headers: {} }
  );
  expect(Array.isArray(data)).toBe(true);
});

it('should call the API to get the historic data limited to 1000 and sorted ASC by default', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.history();
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24limit=1000&%24order=vigenciadesde+ASC',
    { headers: {} }
  );
  expect(Array.isArray(data)).toBe(true);
});

it('should call the API to get the historic data limited to 1000 and sorted ASC by default', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.history({ limit: 10, order: 'DESC' });
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24limit=10&%24order=vigenciadesde+DESC',
    { headers: {} }
  );
  expect(Array.isArray(data)).toBe(true);
});

it('should call the API for a given date', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.date('1991-12-02');
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24where=%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3E%3D+%271991-12-02%27+AND+vigenciahasta+%3C%3D+%271991-12-02%27%29+OR+%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29&%24order=vigenciadesde+ASC',
    { headers: {} }
  );
  expect(data).toMatchObject({
    valor: expect.any(String),
    vigenciadesde: expect.any(String),
    vigenciahasta: expect.any(String),
    unidad: expect.any(String),
  });
});

it('should call the API with a given query', async () => {
  const trmapi = new TrmApi();
  const data = await trmapi.query(
    "SELECT valor, vigenciadesde WHERE valor >= 4000 AND vigenciadesde > '2020-04-01'"
  );
  expect(
    axios.get
  ).toBeCalledWith(
    'https://www.datos.gov.co/resource/32sa-8pi3.json?%24query=SELECT+valor%2C+vigenciadesde+WHERE+valor+%3E%3D+3500+AND+vigenciadesde+%3E+%272020-01-01%27',
    { headers: {} }
  );
  expect(Array.isArray(data)).toBe(true);
});

it('should call the API with an app token', async () => {
  const trmapi = new TrmApi('1234');
  await trmapi.date('1991-12-02');
  expect(axios.get).toBeCalledWith(expect.anything(), {
    headers: { 'X-App-Token': '1234' },
  });
});
