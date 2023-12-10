import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { Instrument } from "../../models/instrument";
import { CardInstrument } from "./cardInstrument";

const mockInstrument = {
  id: "1",
  name: "example",
  inventor: "someone",
  developed: "2000",
  classification: "aerophones",
  shortDescription: "aeiou",
  image: {
    urlOriginal: "a.jpg",
    url: "a.jpg",
    mimetype: "a",
    size: 3,
  },
  video: "yes",
};
describe("Given Card component", () => {
  describe("When it is intantiate", () => {
    beforeEach(() => {
      render(
        <Router>
          <CardInstrument item={mockInstrument as Instrument}></CardInstrument>
        </Router>
      );
    });

    test("Then it should be in the document", () => {
      const element = screen.getByRole("listitem");
      expect(element).toBeInTheDocument();
    });
  });
});
