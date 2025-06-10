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
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "./services/Transactions.service";
import { useQuery } from "@tanstack/react-query";
import { setCategories, setTransactions } from "../../redux/states";
import { Category, Transaction } from "../../models";
import { getAllCategories } from "./services/Categories.service";

export default function Dashboard() {
    useSetActivePage();
    const dispatch = useDispatch();

    const activeProfile = useSelector((state) => state.profile.fm_u);

    const {
        isLoading,
        isError,
        data: transactionsData = [],
    } = useQuery<Transaction[]>({
        queryKey: ["transactions"],
        queryFn: () => getAllTransactionsLocal(activeProfile),
        refetchOnWindowFocus: false,
    });

    const {
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
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
