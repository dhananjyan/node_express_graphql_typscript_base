import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { RoleType, RoleInputType, RolePaginatedListResponseType, UpdateRoleInputType, paginatedFilterRoleInputType } from "./Role.type";
import RoleController from "./Role.controller";
import { MutationResponseType } from "../../graphql/common.type";

@Resolver(RoleType)
export class RoleResolver {

    roleController: RoleController
    constructor() {
        this.roleController = new RoleController()
    }

    @Query(() => RolePaginatedListResponseType)
    // @Authorized()
    async roles(
        @Arg("payload") payload: paginatedFilterRoleInputType,
    ): Promise<RolePaginatedListResponseType> {
        return await this.roleController.getAllRoles(payload);
    }

    @Mutation(() => MutationResponseType)
    async createRole(
        @Arg("payload") payload: RoleInputType,
    ): Promise<MutationResponseType> {
        return this.roleController.createRole(payload)
    }

    @Mutation(() => MutationResponseType)
    async updateRole(
        @Arg("payload") payload: UpdateRoleInputType,
    ): Promise<MutationResponseType> {
        return this.roleController.update(payload)
    }
}
