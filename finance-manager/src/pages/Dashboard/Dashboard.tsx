import LittleCard from "./components/LittleCard/LittleCard";
import "./Dashboard.css";
import { Textfit } from "react-textfit";
import HalfPieChart from "./components/Charts/HalfPieChart/HalfPieChart";
import { useSelector } from "react-redux";
import { Transaction } from "../../models";
import { useEffect, useState } from "react";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import DashboardActions from "./components/DashboardActions/DashboardActions";
import useSetActivePage from "../../hooks/useSetActivePage";
import { useLocation } from "react-router";

export default function Dashboard() {

    const location = useLocation();
    useSetActivePage(location.pathname);

    const transactions: Transaction[] = useSelector(
        (state) => state.transaction
    );

    const [balance, setBalance] = useState(0);

    const getBalance = () => {
        setBalance(
            transactions.reduce(
                (prev, curr) =>
                    curr.transactionType === "income"
                        ? prev + curr.amount
                        : prev - curr.amount,
                0
            )
        );
    };

    useEffect(() => {
        getBalance();
    }, [transactions]);

    return (
        <div className="dashboard-page">
            <LittleCard className="user-container" title="Balance">
                <Textfit className="balance-container" max={72} mode="single">
                    {balance}€
                </Textfit>
            </LittleCard>
            <LittleCard
                className="user-incomes-graph-container"
                title="Ingresos"
            >
                <HalfPieChart type="income" />
            </LittleCard>
            <LittleCard
                className="user-expenses-graph-container"
                title="Gastos"
            >
                <HalfPieChart type="expense" />
            </LittleCard>

            <section className="incomes-details-container">
                <div className="incomes-details-title">
                    Detalles Ingresos
                    <div className="details-line details-line-income"></div>
                </div>
                <div>
                    <TransactionDetails type="income" />
                </div>
            </section>
            <section className="expenses-details-container">
                <div className="expenses-details-title">
                    Detalles Gastos
                    <div className="details-line details-line-expense"></div>
                </div>
                <div>
                    <TransactionDetails type="expense" />
                </div>
            </section>

            <section className="footer-container">
                <DashboardActions />
            </section>
        </div>
    );
}
