export interface Transaction {
    id: number;
    type: "income" | "expense";
    amount: number;
    description: string;
    category: string;
    date: string;
    note?: string;
}
