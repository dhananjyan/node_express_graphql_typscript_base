import { Schema } from "mongoose";
import CategoryModel, { ICategory } from "./Category.model";
import { CategoryType, CategoryInputType } from "./Category.type";

class CategoryService {
    async getAll(payload: { parentCategory?: Schema.Types.UUID } = {}): Promise<CategoryType[]> {
        return CategoryModel.find(payload);
    }

    async getOne({ name }: { name?: string }): Promise<ICategory | any> {
        return CategoryModel.findOne({
            name
        })
    }

    async create(payload: CategoryInputType): Promise<ICategory> {
        const category = new CategoryModel(payload);
        return category.save();
    }

}

export default CategoryService;