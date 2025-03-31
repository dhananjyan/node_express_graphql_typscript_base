import CategoryService from "./Product.service";
import { ServiceResponse } from "../../graphql/common.type";
import { ProductType, ProductInputType, ProductPaginatedListResponseType } from "./Product.type";
import { FilterQuery } from "mongoose";
import { IProduct } from "./Product.model";
import { normalizeFilteredInput } from "../../helper";

class UserController {

    categoryService: CategoryService
    constructor() {
        this.categoryService = new CategoryService()
    }

    async getAllProduct(payload: FilterQuery<IProduct>): Promise<ProductPaginatedListResponseType> {
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

    async createCategory(payload: ProductInputType): Promise<ServiceResponse> {
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