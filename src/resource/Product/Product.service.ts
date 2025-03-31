import CategoryModel, { IProduct } from "./Product.model";
import BaseService from "../Common/BaseService";

class CategoryService extends BaseService<IProduct> {
    constructor() {
        super(CategoryModel);
    }

}

export default CategoryService;