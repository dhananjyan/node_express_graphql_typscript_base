import CategoryModel, { ICategory } from "./Category.model";
import BaseService from "../Common/BaseService";

class CategoryService extends BaseService<ICategory> {
    constructor() {
        super(CategoryModel);
    }

}

export default CategoryService;