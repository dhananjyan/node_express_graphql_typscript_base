import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized } from "type-graphql";
import CategoryController from "./Product.controller";
import { ProductType, ProductInputType, ProductPaginatedListResponseType } from "./Product.type";
import { MutationResponseType } from "../../graphql/common.type";
import { IProduct } from "./Product.model";

@Resolver(ProductType)
class ProductResolver {
  categoryController: CategoryController
  constructor() {
    this.categoryController = new CategoryController()
  }

  // *************************************
  // Field Resolver
  // *************************************

  // @FieldResolver()
  // async childCategory(@Root() category: IProduct): Promise<ProductType[]> {
  //   console.log("first", category.name)
  //   return this.categoryController.getAllChildCateogry({
  //     parentCategory: category?._id
  //   })
  // }

  // *************************************
  // Query
  // *************************************

  // @Authorized()
  @Query(_type => ProductPaginatedListResponseType)
  async products(): Promise<ProductPaginatedListResponseType> {
    const result = await this.categoryController.getAllProduct({});
    return result;
  }

  // *************************************
  // Mutation
  // *************************************

  @Mutation(() => MutationResponseType)
  async cretateProduct(
    @Arg("payload") payload: ProductInputType
  ): Promise<MutationResponseType> {
    return this.categoryController.createCategory(payload);
  }

}

export default ProductResolver