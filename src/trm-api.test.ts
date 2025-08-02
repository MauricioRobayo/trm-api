import TrmApi from "./trm-api";
import { jest, afterEach, it, expect } from "@jest/globals";

const mockData = [
  {
    valor: "643.42",
    unidad: "COP",
    vigenciadesde: "1991-12-02T00:00:00.000",
    vigenciahasta: "1991-12-02T00:00:00.000",
  },
  {
    valor: "639.22",
    unidad: "COP",
    vigenciadesde: "1991-12-03T00:00:00.000",
    vigenciahasta: "1991-12-03T00:00:00.000",
  },
  {
    valor: "635.70",
    unidad: "COP",
    vigenciadesde: "1991-12-04T00:00:00.000",
    vigenciahasta: "1991-12-04T00:00:00.000",
  },
  {
    valor: "631.51",
    unidad: "COP",
    vigenciadesde: "1991-12-05T00:00:00.000",
    vigenciahasta: "1991-12-05T00:00:00.000",
  },
  {
    valor: "627.16",
    unidad: "COP",
    vigenciadesde: "1991-12-06T00:00:00.000",
    vigenciahasta: "1991-12-06T00:00:00.000",
  },
];

const createFetchResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

afterEach(() => {
  jest.restoreAllMocks();
});

it("should call the API to get the latest data", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.latest();
  expect(fetchMock).toHaveBeenCalledWith(
    "https://www.datos.gov.co/resource/32sa-8pi3.json?%24limit=1&%24order=vigenciahasta+DESC",
    { headers: {} },
  );
  expect(data).toMatchObject({
    valor: expect.any(String),
    vigenciadesde: expect.any(String),
    vigenciahasta: expect.any(String),
    unidad: expect.any(String),
  });
});

it("should call the API to get the data between two dates sorted ASC by default", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.between({
    startAt: "1991-12-02",
    endAt: "1991-12-02",
  });
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining(
      "%24where=%28vigenciadesde+%3C%3D+%271991-12-02%27+AND+vigenciahasta+%3E%3D+%271991-12-02%27%29",
    ),
    { headers: {} },
  );
  expect(Array.isArray(data)).toBe(true);
});

it("should call the API to get the data between two dates sorted DESC", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.between({
    startAt: "1991-12-02",
    endAt: "1991-12-02",
    order: "DESC",
  });
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("%24order=vigenciadesde+DESC"),
    { headers: {} },
  );
  expect(Array.isArray(data)).toBe(true);
});

it("should call the API to get the historic data limited to 1000 and sorted ASC by default (DESC order)", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.history();
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("%24limit=1000"),
    { headers: {} },
  );
  expect(Array.isArray(data)).toBe(true);
});

it("should call the API to get the historic data limited to 1000 and sorted ASC by default", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.history({ limit: 10, order: "DESC" });
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("%24limit=10"),
    { headers: {} },
  );
  expect(Array.isArray(data)).toBe(true);
});

it("should call the API for a given date", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.date("1991-12-02");
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining(
      "%24where=%28vigenciadesde+%3C%3D+%271991-12-02%27",
    ),
    { headers: {} },
  );
  expect(data).toMatchObject({
    valor: expect.any(String),
    vigenciadesde: expect.any(String),
    vigenciahasta: expect.any(String),
    unidad: expect.any(String),
  });
});

it("should call the API with a given query", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi();
  const data = await trmApi.query(
    "SELECT valor, vigenciadesde WHERE valor >= 4150 AND vigenciadesde < '2020-08-01'",
  );
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining(
      "%24query=SELECT+valor%2C+vigenciadesde+WHERE+valor+%3E%3D+4150+AND+vigenciadesde+%3C+%272020-08-01%27",
    ),
    { headers: {} },
  );
  expect(Array.isArray(data)).toBe(true);
});

it("should call the API with an app token", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(createFetchResponse(mockData));
  const trmApi = new TrmApi("1234");
  await trmApi.date("1991-12-02");
  expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
    headers: { "X-App-Token": "1234" },
  });
});
