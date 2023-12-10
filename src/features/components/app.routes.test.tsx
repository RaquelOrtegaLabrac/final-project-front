import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { AppRoutes } from "./app.routes";
import "@testing-library/jest-dom";

const MockedComponent = jest.fn().mockReturnValue(<h1>Test</h1>);
jest.mock("./home/home", () => MockedComponent);
jest.mock("./register/register", () => MockedComponent);
jest.mock("./login/login", () => MockedComponent);
jest.mock("./instrumentForm/instrumentForm", () => MockedComponent);

describe("Given the AppRoutes component", () => {
  let element: HTMLElement;

  beforeEach(async () => {
    await act(async () =>
      render(
        <Router initialEntries={["/"]} initialIndex={0}>
          <AppRoutes></AppRoutes>
        </Router>
      )
    );

    element = screen.getByText("Test");
  });

  describe("When it is instantiated with a route /", () => {
    test("Then it should render Home", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with a route /register", () => {
    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/register"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );
    });

    test("Then it should render Register", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with a route /login", () => {
    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/login"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );
    });

    test("Then it should render Login", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with a route /form", () => {
    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/form"]} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        )
      );
    });

    test("Then it should render Login", () => {
      expect(MockedComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
