import { render, screen } from "@testing-library/react";
import Input from "@/components/ui/Input"; // Adjust path as needed

describe("Input Component", () => {
  it("renders with correct placeholder, size, and width classes", () => {
    // Render the Input component with specific props
    render(
      <Input id="test-input" placeholder="Enter text" size="sm" width="full" />
    );

    // Get the input element by placeholder text
    const inputElement = screen.getByPlaceholderText("Enter text");

    // Assertions
    expect(inputElement).toBeInTheDocument(); // Check if it renders
    expect(inputElement).toHaveClass("px-2 py-1"); // Combine classes into one string
    expect(inputElement).toHaveClass("w-full"); // Single class
    expect(inputElement).toHaveAttribute("id", "test-input"); // Check id prop
  });
});
