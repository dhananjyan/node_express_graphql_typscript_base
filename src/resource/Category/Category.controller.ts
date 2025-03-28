import CategoryService from "./Category.service";
import { ServiceResponse } from "../../graphql/common.type";
import { CategoryType, CategoryInputType, CategoryPaginatedListResponseType } from "./Category.type";
import { FilterQuery } from "mongoose";
import { ICategory } from "./Category.model";
import { normalizeFilteredInput } from "../../helper";

class UserController {

    categoryService: CategoryService
    constructor() {
        this.categoryService = new CategoryService()
    }

    async getAllCategory(payload: FilterQuery<ICategory>): Promise<CategoryPaginatedListResponseType> {
        try {
            let { limit, page, ...filters } = payload;

            const skip = (page - 1) * limit;

            let normalizedFilters = normalizeFilteredInput(filters);

            const category = await this.categoryService.getPaginated({
                filters: normalizedFilters,
                limit,
                skip
            });

            return {
                item: category.data,
                total: category.total,
                hasMore: false,

            }
        } catch (error) {
            console.error(error)
            return {
                item: []
            }
        }
    }
    async getAllChildCateogry(payload: FilterQuery<ICategory>): Promise<CategoryType[]> {
        return this.categoryService.getAll(payload);
    }

    async createCategory(payload: CategoryInputType): Promise<ServiceResponse> {
        try {
            await this.categoryService.create(payload);
            return {
                status: 200,
                message: "Category created succesfully",
            }
        } catch (error: any) {
            console.error(error)
            return {
                status: 500,
                message: error?.message
            }
        }
    }

}

export default UserController;