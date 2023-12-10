import { Instrument } from "../models/instrument";
import reducer, { InstrumentsState, create, load } from "./instrument.slice";

describe("Given the instrumentsSlice", () => {
  describe("When I have the reducer", () => {
    test("Then it should load the instruments to the state", () => {
      const mockData: Instrument[] = [];
      const state: InstrumentsState = {} as InstrumentsState;
      const newState = reducer(state, load(mockData));
      expect(newState).toEqual({ instruments: mockData });
    });
    test("Then it should create a new instrument", () => {
      const initialMockState = {
        instruments: [
          {
            id: 1,
            name: "Instrument 1",
          },
          { id: 2, name: "Instrument 2" },
        ],
      } as unknown as InstrumentsState;

      const payload = { id: 3, name: "Instrument 3" };
      const newState = reducer(initialMockState, create(payload));

      expect(newState.instruments).toEqual([
        { id: 1, name: "Instrument 1" },
        { id: 2, name: "Instrument 2" },
        { id: 3, name: "Instrument 3" },
      ]);
    });
  });
});
