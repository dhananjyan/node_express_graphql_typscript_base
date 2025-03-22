import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized } from "type-graphql";
import UserController from "./User.controller";
import { LoginInputType, LoginResponseType, UpdateUserInputType, UserType, createUserInputType, UserPaginatedListResponseType, paginatedFilterUserInputType } from "./User.type";
import { MutationResponseType } from "../../graphql/common.type";
import { Permissions } from "../Role/Role.type";
import { IUser } from "./User.model";
import { IRole } from "../Role/Role.model";

@Resolver(UserType)
export class UserResolver {
  userController: UserController
  constructor() {
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
    const result = await this.userController.getAllUsers(payload);
    return result;
  }


  // *************************************
  // Mutation
  // *************************************

  @Mutation(() => MutationResponseType)
  async createUser(
    @Arg("payload") payload: createUserInputType
  ): Promise<MutationResponseType> {
    return this.userController.createUser(payload);
  }

  @Mutation(() => MutationResponseType)
  async updateUser(
    @Arg("payload") payload: UpdateUserInputType
  ): Promise<MutationResponseType> {
    return this.userController.update(payload);
  }

  @Mutation(() => LoginResponseType)
  async userLogin(
    @Arg("payload") payload: LoginInputType
  ): Promise<LoginResponseType> {
    return this.userController.login(payload);
  }
}
