/* eslint-disable react/jsx-no-literals */
import { render, screen } from "test-utils";

import { Button } from "../button";

describe("Button", () => {
  it("should render a button with the correct text", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test");
  });

  it("should handle click events", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Test</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("should render a button with the correct size", () => {
    render(<Button size="sm">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-xs");
  });

  it("should render a button with the correct variant", () => {
    render(<Button variant="outline">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("renders as a button when asChild is false", () => {
    const { container } = render(<Button asChild={false}>Test</Button>);
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("renders as a span when asChild is true", () => {
    const { container } = render(
      <Button
        variant="outline"
        asChild
      >
        <span>Click Me!</span>
      </Button>
    );

    expect(container.querySelector("button")).not.toBeInTheDocument();

    const targetSpan = container.querySelector("span");

    expect(targetSpan).not.toBeNull();
    expect(targetSpan).toBeInTheDocument();
    expect(targetSpan).toHaveClass("border");
  });
});
