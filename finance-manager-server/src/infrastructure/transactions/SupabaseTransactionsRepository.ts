import { supabase } from "../../config/supabaseClient";
import { Transaction } from "../../domain/transactions/entities/Transaction.entity";
import { ITransactionRepository } from "../../domain/transactions/repositories/ITransactionRepository";

export class SupabaseTransactionsRepository implements ITransactionRepository {
    async getAllTransactions(profileUUID: string): Promise<any[]> {
        const { data, error } = await supabase
            .from("Transactions")
            .select(
                `

    *,
    category:Z_Categories(*)
  `
            )
            .or(`senderId.eq.${profileUUID},receiverId.eq.${profileUUID}`)
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        const transactions = data.map(
            ({ categoryId, ...transaction }) => transaction
        );

        return transactions;
    }

    async getGroupTransactions(
        groupId: string,
        memberUUID: string
    ): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async addTransaction(transaction: Transaction) {
        const { data, error } = await supabase
            .from("Transactions")
            .insert([transaction]);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async removeTransaction(transactionId: string) {
        const { data, error } = await supabase
            .from("Transactions")
            .delete()
            .eq("transactionId", transactionId);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async editTransaction(transaction: any) {
        const { data, error } = await supabase
            .from("Transactions")
            .update(transaction)
            .eq("transactionId", transaction.transactionId);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}
