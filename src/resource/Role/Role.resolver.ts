import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { RoleType, RoleInputType, RolePaginatedListResponseType, UpdateRoleInputType, paginatedFilterRoleInputType } from "./Role.type";
import RoleController from "./Role.controller";
import { MutationResponseType } from "../../graphql/common.type";
import BaseResolver from "../Common/BaseResolver";

@Resolver(RoleType)
export class RoleResolver extends BaseResolver {

    roleController: RoleController
    constructor() {
        super()
        this.roleController = new RoleController()
    }

    @Query(() => RolePaginatedListResponseType)
    // @Authorized()
    async roles(
        @Arg("payload") payload: paginatedFilterRoleInputType,
    ): Promise<RolePaginatedListResponseType> {
        try {
            const result = await this.roleController.getAllRoles(payload);
            return this.response(result);
        } catch (error: any) {
            return this.errorResponse(error)
        }
    }

    @Mutation(() => MutationResponseType)
    async createRole(
        @Arg("payload") payload: RoleInputType,
    ): Promise<MutationResponseType> {
        try {
            const result = await this.roleController.createRole(payload)
            return this.response(result);
        } catch (error: any) {
            return this.errorResponse(error)
        }
    }

    @Mutation(() => MutationResponseType)
    async updateRole(
        @Arg("payload") payload: UpdateRoleInputType,
    ): Promise<MutationResponseType> {
        try {
            const result = await this.roleController.update(payload)
            return this.response(result);
        } catch (error: any) {
            return this.errorResponse(error)
        }
    }
}
