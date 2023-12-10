import { InstrumentRepository } from "./instrument.repository";

describe("Given InstrumentRepository", () => {
  let repo: InstrumentRepository;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    repo = new InstrumentRepository("a", "token");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("When getAll function is called", () => {
    test("Then it should return the items", async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue({ items: [{ id: 1, name: "Instrument" }] }),
      };

      mockFetch.mockImplementation(() => Promise.resolve(mockResponse));

      const result = await repo.getAll();
      expect(mockFetch).toHaveBeenCalledWith("a" + "instrument");
      expect(result).toEqual([{ id: 1, name: "Instrument" }]);
    });
  });
  test("Then it should throw an error message", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };
    mockFetch.mockResolvedValue(mockResponse);
    await expect(repo.getAll()).rejects.toThrowError(
      "Error: 500. Internal Server Error"
    );
  });
  describe("When createInstrument function is called", () => {
    test("Then it should create a new instrument", async () => {
      const instrumentData = new FormData();
      instrumentData.append("name", "New Instrument");

      const createdInstrument = { id: 1, name: "New Instrument" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(createdInstrument),
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic",
        url: "http://localhost:4206/instruments/",
      });

      const result = await repo.createInstrument(instrumentData);

      expect(global.fetch).toHaveBeenCalled(),
        expect(result).toEqual(createdInstrument);
    });

    test("Then it should throw an error message", async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      };
      mockFetch.mockResolvedValue(mockResponse);
      await expect(repo.getAll()).rejects.toThrowError(
        "Error: 500. Internal Server Error"
      );
    });
  });
});
