import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useInstruments } from "./use.instruments";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";

import { InstrumentRepository } from "../../core/services/instrument.repository";

jest.mock("../components/config", () => ({
  url: "",
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const mockInstrument = {
  inventor: "a",
  name: "name",
  developed: "a",
  shortDescription: "a",
  classification: "Idiophones",
} as unknown as FormData;

describe("Given UseInstruments hook", () => {
  const TestComponent = () => {
    const { handleLoadInstruments, handleCreateInstrument } = useInstruments();
    return (
      <>
        <button onClick={handleLoadInstruments}>handleLoad</button>
        <button onClick={() => handleCreateInstrument(mockInstrument)}>
          handleCreate
        </button>{" "}
      </>
    );
  };

  describe("When it is called", () => {
    let elements: HTMLElement[];
    beforeEach(async () => {
      (InstrumentRepository.prototype.getAll = jest.fn()),
        await act(() =>
          render(
            <Router>
              <Provider store={store}>
                <TestComponent></TestComponent>
              </Provider>
            </Router>
          )
        );
    });
    test("Then it should return handleLoadInstruments function", () => {
      elements = screen.getAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
    test("Then...", async () => {
      await act(async () => {
        elements = screen.getAllByRole("button");

        await userEvent.click(elements[0]);
        expect(InstrumentRepository.prototype.getAll).toHaveBeenCalled();
      });
    });
    describe("When it is called", () => {
      let elements: HTMLElement[];
      beforeEach(async () => {
        (InstrumentRepository.prototype.createInstrument = jest.fn()),
          await act(() =>
            render(
              <Router>
                <Provider store={store}>
                  <TestComponent></TestComponent>
                </Provider>
              </Router>
            )
          );
      });
      test("Then...", async () => {
        await act(async () => {
          elements = screen.getAllByRole("button");

          await userEvent.click(elements[1]);
        });
      });
    });
  });
});
