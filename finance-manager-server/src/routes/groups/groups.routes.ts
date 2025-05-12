import { Router } from "express";
import { SupabaseGroupsRepository } from "../../infrastructure/groups/SupabaseGroupsRepository";
import { GroupsService } from "../../application/groups/services/groups.service";
import { GroupsController } from "../../interfaces/controllers/groups/groups.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const groupsRouter = Router();

const groupsRepository = new SupabaseGroupsRepository();
const groupsService = new GroupsService(groupsRepository);
const groupsController = new GroupsController(groupsService);

/**
 * @openapi
 * /groups:
 *   get:
 *     summary: Obtener todos los grupos
 *     tags:
 *       - Groups
 *     responses:
 *       200:
 *         description: Lista de grupos
 */
groupsRouter.get("/", authenticateToken, groupsController.getGroups);

/**
 * @openapi
 * /groups/create:
 *   post:
 *     summary: Crear un nuevo grupo
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Grupo creado correctamente
 *       400:
 *         description: Error al crear el grupo
 *       500:
 *         description: Error interno del servidor
 */
groupsRouter.post("/create", authenticateToken, groupsController.createGroup);

/**
 * @openapi
 * /groups/add-member:
 *   post:
 *     summary: Agregar un nuevo miembro al grupo
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Miembro agregado correctamente
 *       400:
 *         description: Error al agregar el miembro
 *       500:
 *         description: Error interno del servidor
 */
groupsRouter.post(
    "/add-member",
    authenticateToken,
    groupsController.addMemberToGroup
);

export default groupsRouter;
