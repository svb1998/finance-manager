import LittleCard from "./components/LittleCard/LittleCard";
import "./Dashboard.css";
import { Textfit } from "react-textfit";
import HalfPieChart from "./components/Charts/HalfPieChart/HalfPieChart";
import { useEffect } from "react";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import DashboardActions from "./components/DashboardActions/DashboardActions";
import useSetActivePage from "../../hooks/useSetActivePage";

import { ErrorBoundary } from "../../utilities/ErrorBoundaries";
import useBalance from "../../hooks/useBalance";
import axiosPrivate from "../../interceptors/PrivateAxios.interceptor";

export default function Dashboard() {
    useSetActivePage();

    const balance = useBalance();

    // useEffect(() => {
    //     try {
    //         axiosPrivate.get("/profile");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    return (
        <div className="dashboard-page">
            <ErrorBoundary
                fallback={
                    <div style={{ color: "red" }}>Something went wrong</div>
                }
            >
                <LittleCard className="user-container" title="Balance">
                    <Textfit
                        className="balance-container"
                        max={72}
                        mode="single"
                    >
                        {balance}€
                    </Textfit>
                </LittleCard>
            </ErrorBoundary>
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
