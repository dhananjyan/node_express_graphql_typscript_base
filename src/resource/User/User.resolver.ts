import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized } from "type-graphql";
import UserController from "./User.controller";
import { LoginInputType, LoginResponseType, UpdateUserInputType, UserType, createUserInputType, UserPaginatedListResponseType, paginatedFilterUserInputType } from "./User.type";
import { MutationResponseType } from "../../graphql/common.type";
import { Permissions } from "../Role/Role.type";
import { IUser } from "./User.model";
import { IRole } from "../Role/Role.model";
import { GraphQLError } from "graphql";
import Error from "../../graphql/Error";
import BaseResolver from "../Common/BaseResolver";

@Resolver(UserType)
export class UserResolver extends BaseResolver {
  userController: UserController
  constructor() {
    super()
    this.userController = new UserController()
  }

  // *************************************
  // Field Resolver
  // *************************************

  @FieldResolver()
  userRoles(@Root() user: IUser): Promise<IRole[] | null> {
    return this.userController.getUserRoles(user.toObject())
  }

  // *************************************
  // Query
  // *************************************
  // @Authorized([Permissions.CATEGORY_CREATE])
  @Query(_type => UserPaginatedListResponseType)
  async users(
    @Arg("payload") payload: paginatedFilterUserInputType
  ): Promise<UserPaginatedListResponseType> {
    try {
      const result = await this.userController.getAllUsers(payload);
      return this.response(result);
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }


  // *************************************
  // Mutation
  // *************************************

  @Mutation(() => MutationResponseType)
  async createUser(
    @Arg("payload") payload: createUserInputType
  ): Promise<MutationResponseType> {
    try {
      const result = await this.userController.createUser(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }

  @Mutation(() => MutationResponseType)
  async updateUser(
    @Arg("payload") payload: UpdateUserInputType
  ): Promise<MutationResponseType> {
    try {
      const result = await this.userController.update(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }

  @Mutation(() => LoginResponseType)
  async userLogin(
    @Arg("payload") payload: LoginInputType
  ): Promise<LoginResponseType> {
    try {
      const result = await this.userController.login(payload);
      return this.response(result)
    } catch (error: any) {
      return this.errorResponse(error)
    }
  }
}
