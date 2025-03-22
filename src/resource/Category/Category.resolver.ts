import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized } from "type-graphql";
import CategoryController from "./Category.controller";
import { CategoryType, CategoryInputType, CategoryPaginatedListResponseType } from "./Category.type";
import { MutationResponseType } from "../../graphql/common.type";
import { ICategory } from "./Category.model";

@Resolver(CategoryType)
export class CategoryResolver {
  categoryController: CategoryController
  constructor() {
    this.categoryController = new CategoryController()
  }

  // *************************************
  // Field Resolver
  // *************************************

  @FieldResolver()
  async childCategory(@Root() category: ICategory): Promise<CategoryType[]> {
    console.log("first", category.name)
    return this.categoryController.getAllChildCateogry({
      parentCategory: category?._id
    })
  }

  // *************************************
  // Query
  // *************************************

  // @Authorized()
  @Query(_type => CategoryPaginatedListResponseType)
  async category(): Promise<CategoryPaginatedListResponseType> {
    const result = await this.categoryController.getAllCategory();
    return result;
  }

  // *************************************
  // Mutation
  // *************************************

  @Mutation(() => MutationResponseType)
  async createCategory(
    @Arg("payload") payload: CategoryInputType
  ): Promise<MutationResponseType> {
    return this.categoryController.createCategory(payload);
  }

}