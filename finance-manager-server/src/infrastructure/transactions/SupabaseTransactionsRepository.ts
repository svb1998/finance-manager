import { supabase } from "../../config/supabaseClient";
import { ITransactionRepository } from "../../domain/transactions/repositories/ITransactionRepository";

export class SupabaseTransactionsRepository implements ITransactionRepository {
    async getAllTransactions(profileUUID: string): Promise<any[]> {
        const { data, error } = await supabase
            .from("Transactions")
            .select("*")
            .or(`senderId.eq.${profileUUID},receiverId.eq.${profileUUID}`)
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async getGroupTransactions(
        groupId: string,
        memberUUID: string
    ): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async addTransaction(transaction: any) {
        throw new Error("Method not implemented.");
    }

    async removeTransaction(transactionId: string) {
        throw new Error("Method not implemented.");
    }

    async editTransaction(transaction: any) {
        throw new Error("Method not implemented.");
    }
}
