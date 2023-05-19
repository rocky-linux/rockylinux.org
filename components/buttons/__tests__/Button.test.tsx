import { render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Button Component", () => {
  it("renders with passed children", () => {
    render(<Button>Find Me!</Button>);

    expect(
      screen.getByRole("button", { name: /Find Me!/i })
    ).toBeInTheDocument();
  });
});
