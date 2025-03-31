import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized } from "type-graphql";
import UserController from "./Customer.controller";
import { CustomerLoginInputType, CustomerLoginResponseType, UpdateCustomerInputType, CustomerType, createCustomerInputType, CustomerPaginatedListResponseType, paginatedFilterCustomerInputType } from "./Customer.type";
import { MutationResponseType } from "../../graphql/common.type";
import BaseResolver from "../Common/BaseResolver";

@Resolver(CustomerType)
export default class CustomerResolver extends BaseResolver {
  userController: UserController
  constructor() {
    super()
    this.userController = new UserController()
  }

  // *************************************
  // Field Resolver
  // *************************************

  // @FieldResolver()
  // userRoles(@Root() user: ICustomer): Promise<IRole[] | null> {
  //   return this.userController.getUserRoles(user.toObject())
  // }

  // *************************************
  // Query
  // *************************************
  // @Authorized([Permissions.CATEGORY_CREATE])
  @Query(_type => CustomerPaginatedListResponseType)
  async customers(
    @Arg("payload") payload: paginatedFilterCustomerInputType
  ): Promise<CustomerPaginatedListResponseType> {
    try {
      const result = await this.userController.getAllCustomers(payload);
      return this.response(result);
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }


  // *************************************
  // Mutation
  // *************************************

  @Mutation(() => MutationResponseType)
  async createCustomer(
    @Arg("payload") payload: createCustomerInputType
  ): Promise<MutationResponseType> {
    try {
      const result = await this.userController.create(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }

  @Mutation(() => MutationResponseType)
  async updateCustomer(
    @Arg("payload") payload: UpdateCustomerInputType
  ): Promise<MutationResponseType> {
    try {
      const result = await this.userController.update(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }

  @Mutation(() => CustomerLoginResponseType)
  async customerLogin(
    @Arg("payload") payload: CustomerLoginInputType
  ): Promise<CustomerLoginResponseType> {
    try {
      const result = await this.userController.login(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }
}
