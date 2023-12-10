import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstrumentRepository } from "../../core/services/instrument.repository";
import { AppDispatch, RootState } from "../../core/store/store";
import { create, load, update, remove } from "../redux/instrument.slice";
import { url } from "../components/config";
import { Instrument } from "../models/instrument";

export function useInstruments() {
  const { instruments } = useSelector((state: RootState) => state.instruments);
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const instrumentRepo: InstrumentRepository = useMemo(
    () => new InstrumentRepository(url, token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleLoadInstruments = useCallback(async () => {
    const instruments = await instrumentRepo.getAll();
    dispatch(load(instruments));
  }, [dispatch, instrumentRepo]);

  const handleCreateInstrument = async (instrument: FormData) => {
    const newInstrument = await instrumentRepo.createInstrument(instrument);
    dispatch(create(newInstrument));
  };

  const handleUpdateInstrument = async (
    id: Instrument["id"],
    updatedInstrument: FormData
  ) => {
    try {
      const updatedInstrumentData = await instrumentRepo.updateInstrument(
        id,
        updatedInstrument
      );

      dispatch(update(updatedInstrumentData));
    } catch (error) {
      console.error("Error updating instrument:", error);
    }
  };

  const handleDeleteInstrument = async (id: Instrument["id"]) => {
    const deletedInstrument = await instrumentRepo.deleteInstrument(id);
    dispatch(remove(deletedInstrument));
  };

  return {
    handleLoadInstruments,
    handleCreateInstrument,
    handleUpdateInstrument,
    handleDeleteInstrument,
    instruments,
    instrumentRepo,
    url,
  };
}
