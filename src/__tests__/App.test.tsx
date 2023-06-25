import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

test("application boots up okay with no pre-filled friends and expenses", () => {
    render(<App />);

    waitFor(() => {
        const appById = screen.getByTestId("RenderedApp");
        expect(appById).toBeInTheDocument();
    });
});