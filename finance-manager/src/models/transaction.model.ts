export interface Transaction {
    id: string;
    transactionType: "income" | "expense";
    amount: number;
    description: string;
    category: string;
    date: string;
    notes?: string;
}
