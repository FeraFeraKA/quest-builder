import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("testing setup", () => {
  it("uses jest-dom matchers", () => {
    render(<button>Click me</button>);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });
});
