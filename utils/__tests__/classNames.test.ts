import { classNames } from "../classNames";

describe("classNames Utility Class", () => {
  it("combines multiple classes", () => {
    expect(classNames("1", "2", "3")).toBe("1 2 3");
  });
});
