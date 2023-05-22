import { render, screen } from "@testing-library/react";

import Pill from "../Pill";

describe("Pill Component", () => {
  it("renders with passed children", () => {
    render(<Pill>Find Me!</Pill>);

    expect(screen.getByRole("span", { name: /Find Me!/i })).toBeInTheDocument();
  });
});
