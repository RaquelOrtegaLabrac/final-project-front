import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import InstrumentForm from "./instrumentForm";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
import { useInstruments } from "../../hooks/use.instruments";

jest.mock("../../hooks/use.instruments", () => ({
  useInstruments: jest.fn().mockReturnValue({
    handleCreateInstrument: jest.fn(),
  }),
}));

describe("Given the InstrumentCreateForm component", () => {
  describe("When it is rendered", () => {
    test("Then it should have a Submit button in the form", () => {
      render(
        <Provider store={store}>
          <Router>
            <InstrumentForm></InstrumentForm>
          </Router>
        </Provider>
      );

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });

    test("Then the handleCreateInstrument function should be called", async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router>
              <InstrumentForm></InstrumentForm>
            </Router>
          </Provider>
        )
      );
      const form = screen.getByRole("form");
      await fireEvent.submit(form);
      expect(useInstruments().handleCreateInstrument).toHaveBeenCalled();
    });
  });
});
