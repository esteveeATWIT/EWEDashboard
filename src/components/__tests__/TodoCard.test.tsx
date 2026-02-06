import { fireEvent, render, screen } from "@testing-library/react";
import { TodoCard } from "@/components/TodoCard";

describe("TodoCard", () => {
  it("adds todo items", () => {
    render(<TodoCard />);

    fireEvent.change(screen.getByPlaceholderText("Add a task"), { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });
});
