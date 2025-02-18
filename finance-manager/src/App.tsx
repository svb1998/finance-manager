import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, removeTransaction } from "./redux/states/transaction";
import { Transaction } from "./models";
import Dashboard from "./pages/Dashboard/Dashboard";
import PlatformLayout from "./layouts/PlatformLayout/PlatformLayout";

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
        <>
            <PlatformLayout>
                <Dashboard />
            </PlatformLayout>

            {/* <h1>Vite + React</h1>
            <div className="card">
                <button
                    onClick={() => dispatch(addTransaction(defaultTransaction))}
                >
                    Añadir transacción
                </button>
                <button
                    onClick={() =>
                        dispatch(addTransaction(defaultTransaction2))
                    }
                >
                    Añadir transacción 2
                </button>
                <button onClick={() => dispatch(removeTransaction(1))}>
                    Eliminar transacción
                </button>
                <button onClick={() => dispatch(removeTransaction(2))}>
                    Eliminar transacción 2
                </button>
                {transactions.map((transaction) => (
                    <div>
                        {transaction.id}
                        {transaction.amount}
                        {transaction.description}
                    </div>
                ))}
            </div> */}
        </>
    );
}

export default App;
