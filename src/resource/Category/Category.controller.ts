import CategoryService from "./Category.service";
import { ServiceResponse } from "../../graphql/common.type";
import { CategoryType, CategoryInputType, CategoryPaginatedListResponseType } from "./Category.type";
import { createJwtToken } from "../../utils/jwt";
import { Schema } from "mongoose";

class UserController {

    categoryService: CategoryService
    constructor() {
        this.categoryService = new CategoryService()
    }

    async getAllCategory(payload: { parentCategory?: Schema.Types.UUID } = {}): Promise<CategoryPaginatedListResponseType> {
        const category = await this.categoryService.getAll(payload);
        return {
            total: 5,
            hasMore: true,
            item: category
        }
    }
    async getAllChildCateogry(payload: { parentCategory?: Schema.Types.UUID } = {}): Promise<CategoryType[]> {
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