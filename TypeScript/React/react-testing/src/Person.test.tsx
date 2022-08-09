import { render, screen } from "@testing-library/react";
import { Person } from "./Person";

test("renders a name", () => {
  render(<Person name="Jerm" />);
  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveAttribute("role", "contentinfo");
  expect(divElement).toHaveTextContent("Name is Jerm");
});
