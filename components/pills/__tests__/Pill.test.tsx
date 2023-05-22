import React from "react";
import { render } from "@testing-library/react";
import Pill from "../Pill";

describe("Pill Component", () => {
  it("renders with default props", () => {
    const { getByText } = render(<Pill>Test Pill</Pill>);
    const pillElement = getByText("Test Pill");
    expect(pillElement).toBeInTheDocument();
    expect(pillElement).toHaveClass(
      "rounded-md bg-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-green-500 ring-1 ring-inset ring-green-500/10"
    );
  });

  it("renders with custom className", () => {
    const { getByText } = render(
      <Pill className="custom-class">Custom Pill</Pill>
    );
    const pillElement = getByText("Custom Pill");
    expect(pillElement).toBeInTheDocument();
    expect(pillElement).toHaveClass("custom-class");
  });
});
