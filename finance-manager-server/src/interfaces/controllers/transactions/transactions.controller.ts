import { TransactionsService } from "../../../application/transactions/services/transactions.service";
import { Request, Response } from "express";

export class TransactionsController {
    constructor(public readonly transactionsService: TransactionsService) {}

    getAllTransactions = async (req: Request, res: Response) => {
        const profileUUID = req.params.profileUUID;

        try {
            const transactions =
                await this.transactionsService.getAllTransactions(profileUUID);
            res.status(200).json(transactions);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };

    getGroupTransactions = async (req: Request, res: Response) => {};

    addTransaction = async (req: Request, res: Response) => {
        const transaction = req.body;

        try {
            const result = await this.transactionsService.addTransaction(
                transaction
            );
            res.status(201).json(result);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };

    removeTransaction = async (req: Request, res: Response) => {
        const transactionId = req.params.transactionId;

        try {
            const result = await this.transactionsService.removeTransaction(
                transactionId
            );
            res.status(200).json(result);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };

    editTransaction = async (req: Request, res: Response) => {
        const transaction = req.body;

        try {
            const result = await this.transactionsService.editTransaction(
                transaction
            );
            res.status(200).json(result);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };
}
