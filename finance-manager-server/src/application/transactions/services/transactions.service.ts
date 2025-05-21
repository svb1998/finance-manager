import { Transaction } from "../../../domain/transactions/entities/Transaction.entity";
import { ITransactionRepository } from "../../../domain/transactions/repositories/ITransactionRepository";

export class TransactionsService {
    constructor(
        public readonly transactionsRepository: ITransactionRepository
    ) {}

    async getAllTransactions(profileUUID: string) {
        const transactions =
            await this.transactionsRepository.getAllTransactions(profileUUID);
        return transactions;
    }

    async getGroupTransactions(groupId: string, memberUUID: string) {
        const transactions =
            await this.transactionsRepository.getGroupTransactions(
                groupId,
                memberUUID
            );
        return transactions;
    }

    async addTransaction(transaction: Transaction) {
        await this.transactionsRepository.addTransaction(transaction);
        return transaction;
    }

    async removeTransaction(transactionId: string) {
        await this.transactionsRepository.removeTransaction(transactionId);
        return transactionId;
    }

    async editTransaction(transaction: any) {
        await this.transactionsRepository.editTransaction(transaction);
        return transaction;
    }
}
