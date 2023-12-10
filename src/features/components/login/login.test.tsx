import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./login";
import { store } from "../../../core/store/store";
import { useUsers } from "../../hooks/use.users";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoginUser: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe("Given Login component", () => {
  describe("When the component is rendered", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <Login></Login>
          </Router>
        </Provider>
      );
    });
    test("Then the heading <h2> should be in the document", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then the <button> should be used", async () => {
      const form = screen.getByRole("form");
      const inputs = screen.getAllByRole("textbox");
      await userEvent.type(inputs[0], "Pepe");
      expect(inputs[0]).toHaveValue("Pepe");
      await userEvent.type(inputs[1], "tomate");
      expect(inputs[1]).toHaveValue("tomate");
      await fireEvent.submit(form);
      expect(useUsers().handleLoginUser).toHaveBeenCalled();
    });

    test("Then the <button> should be used ....", async () => {
      const form = screen.getByRole("form");
      await fireEvent.submit(form);
      expect(useNavigate()).toHaveBeenCalledWith("/login");
    });
  });
});
