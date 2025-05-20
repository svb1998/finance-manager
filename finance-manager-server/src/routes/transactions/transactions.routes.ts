import { Router } from "express";
import { SupabaseTransactionsRepository } from "../../infrastructure/transactions/SupabaseTransactionsRepository";
import { TransactionsService } from "../../application/transactions/services/transactions.service";
import { TransactionsController } from "../../interfaces/controllers/transactions/transactions.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const transactionsRouter = Router();

const transactionsRepository = new SupabaseTransactionsRepository();
const transactionsService = new TransactionsService(transactionsRepository);
const transactionsController = new TransactionsController(transactionsService);

/**
 * @openapi
 * /transactions/{profileUUID}:
 *   get:
 *     summary: Obtener todas las transacciones asociadas a un perfil
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileUUID
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del perfil
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error al obtener las transacciones
 *       500:
 *         description: Error interno del servidor
 */
transactionsRouter.get(
    "/:profileUUID",
    authenticateToken,
    transactionsController.getAllTransactions
);

transactionsRouter.get(
    "/:groupId/:memberUUID",
    authenticateToken,
    transactionsController.getGroupTransactions
);

transactionsRouter.post(
    "/",
    authenticateToken,
    transactionsController.addTransaction
);

transactionsRouter.delete(
    "/:transactionId",
    authenticateToken,
    transactionsController.removeTransaction
);

transactionsRouter.put(
    "/",
    authenticateToken,
    transactionsController.editTransaction
);

export default transactionsRouter;
