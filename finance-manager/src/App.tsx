import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, removeTransaction } from "./redux/states/transaction";
import { Transaction } from "./models";
import Dashboard from "./pages/Dashboard/Dashboard";
import PlatformLayout from "./layouts/PlatformLayout/PlatformLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Settings from "./pages/Settings/Settings";

function App() {
    const transactions: Transaction[] = useSelector(
        (state) => state.transaction
    );

    const dispatch = useDispatch();

    const defaultTransaction: Transaction = {
        id: 1,
        amount: 100,
        category: "Hobbies",
        date: new Date().toISOString(),
        description: "Escalada",
        type: "expense",
        note: "Correcto",
    };
    const defaultTransaction2: Transaction = {
        id: 2,
        amount: 1000,
        category: "Hobbies",
        date: new Date().toISOString(),
        description: "Parque acuático",
        type: "expense",
        note: "Correcto",
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlatformLayout />}>
                    <Route index path="dashboard" element={<Dashboard />} />
                    <Route path="groups" element={<Settings />} />
                    <Route path="settings" element={<Settings />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/dashboard" />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
