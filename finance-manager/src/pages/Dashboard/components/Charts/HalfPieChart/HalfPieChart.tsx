import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DataItem {
    id: number;
    name: string;
    value: number;
}

interface Props {
    value: number;
    colors?: string[];
    data?: DataItem[];
}

const defaultColors = [
    "#00B8D4",
    "#0088FE",
    "#E0E0E0",
    "#00B8D4",
    "#0088FE",
    "#E0E0E0",
];

export default function HalfPieChart({
    value,
    colors = defaultColors,
    data = [
        {
            id: 1,
            name: "A",
            value: 100,
        },
        {
            id: 2,
            name: "B",
            value: 100,
        },
        {
            id: 3,
            name: "C",
            value: 100,
        },
        {
            id: 4,
            name: "D",
            value: 100,
        },
        {
            id: 5,
            name: "E",
            value: 100,
        },
        {
            id: 6,
            name: "F",
            value: 100,
        },
    ],
}: Props) {
    return (
        <div>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "280px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="96%"
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.id}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
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
                    }}
                >
                    {value}€
                </div>
            </div>
        </div>
    );
}
