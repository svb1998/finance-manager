import LittleCard from "./components/LittleCard/LittleCard";
import "./Dashboard.css";
import { Textfit } from "react-textfit";
import HalfPieChart from "./components/Charts/HalfPieChart/HalfPieChart";
import { useSelector } from "react-redux";
import { Transaction } from "../../models";

export default function Dashboard() {
    const transactions: Transaction[] = useSelector(
        (state) => state.transaction
    );

    return (
        <div className="dashboard-page">
            <LittleCard className="user-container" title="Balance">
                <Textfit className="balance-container" mode="single"></Textfit>
            </LittleCard>
            <LittleCard
                className="user-incomes-graph-container"
                title="Ingresos"
            >
                <HalfPieChart value={500} colors={["#73f7a8", "#05c753"]} />
            </LittleCard>
            <LittleCard
                className="user-expenses-graph-container"
                title="Gastos"
            >
                <HalfPieChart value={500} colors={["#f77394", "#c70536"]} />
            </LittleCard>

            <section className="incomes-details-container">
                <span>Ingresos (Detalles)</span>
                <div>
                    {" "}
                    {transactions.map((transaction) => (
                        <div>{transaction.amount}</div>
                    ))}
                </div>
            </section>
            <section className="expenses-details-container">
                Detalles gastos
            </section>

            <section className="footer-container">Footer</section>
        </div>
    );
}
