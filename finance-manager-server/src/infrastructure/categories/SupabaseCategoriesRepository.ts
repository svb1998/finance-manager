import { supabase } from "../../config/supabaseClient";
import { ICategoryRepository } from "../../domain/categories/repositories/ICategoryRepository";

export class SupabaseCategoriesRepository implements ICategoryRepository {
    async getAll() {
        const { data, error } = await supabase.from("Z_Categories").select();

        if (error) throw new Error(error.message);

        const categories = data.map(({ created_at, ...cat }) => cat);

        return categories;
    }
}
