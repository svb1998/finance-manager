import { describe, it, expect } from "vitest";
import Sidebar from "./Sidebar";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { render, screen } from "../../../utilities/setupTests";

describe("<Sidebar/>", () => {
    it("Renders the sidebar", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Sidebar />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
});
