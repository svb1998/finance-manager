import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction, Category } from "models";
import { useSelector } from "react-redux";
import "./HalfPieChart.css";

interface Props {
    type: "income" | "expense";
    colors?: string[];
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const label = payload[0].name;
        const amount = payload[0].value;

        return (
            <div className="custom-tooltip">
                <div className="vertical-line-ui"></div>
                <p className="custom-tooltip-label">{label}</p>
                <p className="custom-tooltip-amount">{amount}€</p>
            </div>
        );
    }
    return null;
};

export default function HalfPieChart({ type = "income" }: Props) {
    const transactions: Transaction[] = useSelector(
        (store) => store.transaction
    );

    const categories: Category[] = useSelector((state) => state.category);

    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredTransactions, setFilteredTransactions] = useState<
        Transaction[]
    >([]);

    const getTotalAmount = () => {
        let total = 0;
        transactions
            .filter((item) => item.transactionType === type)
            .forEach((item) => {
                total += item.amount;
            });
        setTotalAmount(total);
    };

    const getFilteredTransactions = () => {
        const filteredTransactions: Transaction[] = transactions.filter(
            (item) => item.transactionType === type
        );
        setFilteredTransactions(filteredTransactions);
    };

    useEffect(() => {
        getTotalAmount();
        getFilteredTransactions();
    }, [transactions]);

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "280px",
                }}
            >
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    style={{ outline: "none" }}
                >
                    <PieChart style={{ outline: "none" }}>
                        <Pie
                            data={filteredTransactions}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            isAnimationActive
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="96%"
                            fill="#8884d8"
                            dataKey="amount"
                            style={{ outline: "none" }}
                        >
                            {categories.map((category, index) => (
                                <Cell
                                    name={category.label}
                                    key={`cell-${category.id}`}
                                    fill={category.backgroundColor}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            wrapperStyle={{
                                zIndex: 2,
                            }}
                            content={CustomTooltip}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div
                    style={{
                        position: "absolute",
                        top: "42%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        fontSize: "36px",
                        fontWeight: "bold",
                        zIndex: 1,
                    }}
                >
                    {totalAmount}€
                </div>
            </div>
        </div>
    );
}
