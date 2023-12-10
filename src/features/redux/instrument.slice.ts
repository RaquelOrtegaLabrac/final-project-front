import { Instrument } from "../models/instrument";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type InstrumentsState = {
  instruments: Instrument[];
};

const initialState: InstrumentsState = {
  instruments: [],
};

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    load: (state, action) => {
      state.instruments = action.payload;
    },
    create: (state, { payload }) => ({
      ...state,
      instruments: [...state.instruments, payload],
    }),
    update: (state, action: PayloadAction<Instrument>) => {
      const updatedInstrument = action.payload;
      state.instruments = state.instruments.map((instrument) =>
        instrument.id === updatedInstrument.id ? updatedInstrument : instrument
      );
    },
    remove: (state, action) => {
      const instrumentId = action.payload;
      state.instruments = state.instruments.filter(
        (instrument) => instrument.id !== instrumentId
      );
    },
  },
});

export const { load, create, update, remove } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;
