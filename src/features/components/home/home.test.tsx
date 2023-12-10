import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./home";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom/extend-expect";
import { Instrument } from "../../models/instrument";
import { useSelector } from "react-redux";

jest.mock("../config", () => ({
  url: "",
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue({
    token: "",
    currentUser: {},
  }),
}));

jest.mock("../../hooks/use.instruments", () => ({
  useInstruments: jest.fn().mockReturnValue({
    handleLoadInstruments: jest.fn(),
    instruments: [
      { id: 1, image: "", name: "a" },
      { id: 2, image: "", name: "a" },
    ] as unknown as Instrument[],
  }),
}));

jest.mock("../card/cardInstrument");

describe("Home component", () => {
  const navigateMock = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home></Home>
        </MemoryRouter>
      </Provider>
    );
  });
  test("renders list of instruments when they exist", () => {
    const instrumentElements = screen.getByRole("list");
    expect(instrumentElements).toBeInTheDocument();
  });

  test("renders log out button and username when token and currentUser exist", () => {
    const submit = screen.getAllByRole("button");
    fireEvent.submit(submit[0]);
  });

  test("renders sign up and log in buttons when token and currentUser do not exist", () => {
    expect(screen.getAllByRole("heading")).toHaveLength(2);
  });

  test("does not render add instrument button when token does not exist", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("Add instrument")).toBeNull();
  });

  test("Then...", () => {
    (useSelector as jest.Mock).mockReturnValue({
      token: "gjhgjg",
      currentUser: {},
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
});
