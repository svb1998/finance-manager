import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Transaction } from "../models";

interface GroupedTransaction {
    id: string;
    name: string;
    label: string;
    amount: number;
    color: string | undefined;
}
const useTransactionStats = (type: "income" | "expense") => {
    const transactions: Transaction[] = useSelector(
        (store) => store.transaction
    );

    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredTransactions, setFilteredTransactions] = useState<
        Transaction[]
    >([]);
    const [groupedTransactions, setGroupedTransactions] = useState<
        GroupedTransaction[]
    >([]);

    const getTotalAmount = () => {
        let total = 0;
        transactions
            .filter((item) => item.type === type)
            .forEach((item) => {
                total += item.amount;
            });
        setTotalAmount(total);
    };

    const getFilteredTransactions = () => {
        const filteredTransactions: Transaction[] = transactions.filter(
            (item) => item.type === type
        );
        setFilteredTransactions(filteredTransactions);
        // console.log(filteredTransactions);
    };

    const classifyTransactions = () => {
        const grouped = filteredTransactions.reduce((acc, transaction) => {
            const category = transaction.category;
            if (!category) return acc;

            const existing = acc.find((item) => item.name === category.value);

            if (existing) {
                existing.amount += transaction.amount;
            } else {
                acc.push({
                    id: category.categoryId,
                    name: category.value,
                    label: category.label,
                    amount: transaction.amount,
                    color: category.backgroundColor,
                });
            }
            return acc;
        }, [] as GroupedTransaction[]);

        setGroupedTransactions(grouped);
    };

    useEffect(() => {
        getTotalAmount();
        getFilteredTransactions();
    }, [transactions]);

    useEffect(() => {
        classifyTransactions();
    }, [filteredTransactions]);

    return {
        totalAmount,
        groupedTransactions,
    };
};

export default useTransactionStats;
