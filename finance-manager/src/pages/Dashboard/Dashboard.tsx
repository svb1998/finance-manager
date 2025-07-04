import { Textfit } from "react-textfit";
import useSetActivePage from "../../hooks/useSetActivePage";
import HalfPieChart from "./components/Charts/HalfPieChart/HalfPieChart";
import DashboardActions from "./components/DashboardActions/DashboardActions";
import LittleCard from "./components/LittleCard/LittleCard";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import "./Dashboard.css";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import useBalance from "../../hooks/useBalance";
import { Category, Transaction } from "../../models";
import { setCategories, setTransactions } from "../../redux/states";
import { ErrorBoundary } from "../../utilities/ErrorBoundaries";
import { getAllCategories } from "./services/Categories.service";
import { getAllTransactions } from "./services/Transactions.service";

export default function Dashboard() {
    useSetActivePage();
    const dispatch = useDispatch();

    const activeProfile = useSelector((state) => state.profile.fm_u);

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: transactionsData = [],
    } = useQuery<Transaction[]>({
        queryKey: ["transactions"],
        queryFn: () => getAllTransactionsLocal(activeProfile),
        refetchOnWindowFocus: false,
    });

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: categoriesData = [],
    } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategoriesLocal(),
        refetchOnWindowFocus: false,
    });

    const getAllTransactionsLocal = async (activeProfile: string) => {
        const transactions = await getAllTransactions(activeProfile);
        dispatch(setTransactions(transactions));
        return transactions;
    };

    const getAllCategoriesLocal = async () => {
        const categories = await getAllCategories();
        dispatch(setCategories(categories));
        return categories;
    };

    const balance = useBalance();

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
