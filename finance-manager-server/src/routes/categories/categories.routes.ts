import { Router } from "express";
import { SupabaseCategoriesRepository } from "../../infrastructure/categories/SupabaseCategoriesRepository";
import { CategoriesService } from "../../application/categories/services/categories.service";
import { CategoriesController } from "../../interfaces/controllers/categories/categories.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const categoriesRouter = Router();

const categoriesRepository = new SupabaseCategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const categoriesController = new CategoriesController(categoriesService);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Obtener todas las categorias
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error interno del servidor
 *     401:
 *         description: No autorizado
 */
categoriesRouter.get("/", authenticateToken, categoriesController.getAll);

export default categoriesRouter;
