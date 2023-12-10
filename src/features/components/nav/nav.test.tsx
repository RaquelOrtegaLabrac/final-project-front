import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./nav";
import "@testing-library/jest-dom";

describe("Nav component", () => {
  test("renders the title with a link to the home page", () => {
    render(
      <Router>
        <Nav />
      </Router>
    );

    const linkElement = screen.getByRole("link", { name: /unusual/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
