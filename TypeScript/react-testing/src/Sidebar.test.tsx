import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

const ITEMS = [
  { href: "https://www.google.com", name: "Google" },
  { href: "https://www.yahoo.com", name: "Yahoo" },
  { href: "https://www.bing.com", name: "Bing" },
];

test("renders a name", () => {
  render(<Sidebar items={ITEMS} />);
  const anchorElements = screen.getAllByRole("navigation");
  expect(anchorElements[0]).toHaveTextContent("Google");
  expect(anchorElements[0]).toHaveAttribute("href", ITEMS[0].href);
});
