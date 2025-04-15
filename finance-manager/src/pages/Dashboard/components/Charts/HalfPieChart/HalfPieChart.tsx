import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction, Category } from "models";
import { useSelector } from "react-redux";
import "./HalfPieChart.css";
import { Textfit } from "react-textfit";
import useTransactionStats from "../../../../../hooks/useTransactionStats";

interface Props {
    type: "income" | "expense";
    colors?: string[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}

interface GroupedTransaction {
    id: string;
    name: string;
    label: string;
    amount: number;
    color: string | undefined;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
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
    const { totalAmount, groupedTransactions } = useTransactionStats(type);

    return (
        <div>
            <div className="chart-container">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    style={{ outline: "none" }}
                >
                    <PieChart style={{ outline: "none" }}>
                        <Pie
                            data={groupedTransactions}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            isAnimationActive
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="96%"
                            fill="#8884d8"
                            nameKey="name"
                            dataKey="amount"
                            style={{ outline: "none" }}
                            stroke="none"
                        >
                            {groupedTransactions.map((tx, index) => {
                                return (
                                    <Cell
                                        name={tx.label}
                                        key={`cell-${tx.id}`}
                                        fill={tx.color}
                                    />
                                );
                            })}
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
                    <Textfit className="chart-text" min={24} mode="single">
                        {totalAmount}€
                    </Textfit>
                </div>
            </div>
        </div>
    );
}
