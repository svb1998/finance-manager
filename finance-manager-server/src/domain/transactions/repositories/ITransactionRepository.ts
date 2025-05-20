export interface ITransactionRepository {
    getAllTransactions(profileUUID: string): Promise<any[]>;
    getGroupTransactions(groupId: string, memberUUID: string): Promise<any[]>;
    addTransaction(transaction: any): Promise<any>;
    removeTransaction(transactionId: string): Promise<any>;
    editTransaction(transaction: any): Promise<any>;
}
