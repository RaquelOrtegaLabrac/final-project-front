import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Register from "./register";
import { store } from "../../../core/store/store";
import "@testing-library/jest-dom";
import { useUsers } from "../../hooks/use.users";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleRegisterUser: jest.fn(),
  }),
}));

describe("Given the Register component", () => {
  describe("When register form is rendered", () => {
    const navigateMock = jest.fn();
    beforeEach(() => {
      (useNavigate as jest.Mock).mockReturnValue(navigateMock);

      render(
        <Provider store={store}>
          <Router>
            <Register></Register>
          </Router>
        </Provider>
      );
    });

    test("Then...", async () => {
      const button = [screen.getByRole("button")];

      await fireEvent.click(button[0]);
      expect(button).toHaveLength(1);
    });
    test("Then...", async () => {
      const form = screen.getByRole("form");
      await fireEvent.submit(form);
      expect(useUsers().handleRegisterUser).toHaveBeenCalled();
    });
  });
});
