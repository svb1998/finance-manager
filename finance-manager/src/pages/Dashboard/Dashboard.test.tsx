import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../../redux/store";
import userEvent from "@testing-library/user-event";

//We mock the ResizeObserver to avoid errors in the tests
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe("<Dashboard/>", () => {
    beforeEach(() => {
        const modalRoot = document.createElement("div");
        modalRoot.id = "modal-root";
        document.body.appendChild(modalRoot);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );
    });

    it("Should render an button for adding transactions", () => {
        const button = screen.getByRole("button", {
            name: "Añadir transacción",
        });

        expect(button).toBeInTheDocument();
    });

    it("Should open a modal when the button is clicked", async () => {
        const button = screen.getByRole("button", {
            name: "Añadir transacción",
        });

        await userEvent.click(button);

        const modalRoot = document.getElementById("modal-root");

        const modal = await screen.findByTestId(
            "add-transaction-modal",

            { container: modalRoot }
        );

        expect(modal).toBeInTheDocument();
    });
});
