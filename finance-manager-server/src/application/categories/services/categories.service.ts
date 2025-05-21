import { ICategoryRepository } from "../../../domain/categories/repositories/ICategoryRepository";

export class CategoriesService {
    constructor(public readonly categoriesRepository: ICategoryRepository) {}

    async getAll() {
        return await this.categoriesRepository.getAll();
    }
}
