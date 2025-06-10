import { Category } from "./category.model";

export interface Transaction {
    transactionId: string;
    type: "income" | "expense";
    senderId?: string;
    receiverId?: string;
    amount: number;
    description: string;
    category: Category;
    txDate: Date;
    notes?: string;
}
