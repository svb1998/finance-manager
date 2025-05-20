export interface Transaction {
    transactionId: string;
    categoryId?: string;
    senderId?: string;
    receiverId?: string;
    type: string;
    txDate: Date;
    amount: number;
    description?: string;
    notes?: string;
    created_at: Date;
    groupId?: string;
}
