import { CategoriesService } from "../../../application/categories/services/categories.service";
import { Request, Response } from "express";

export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.categoriesService.getAll();

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
