import RoleService from "./Role.service";
import { MutationResponseType } from "../../graphql/common.type";
import { RoleInputType, RolePaginatedListResponseType, UpdateRoleInputType } from "./Role.type";

class RoleController {

    roleService: RoleService
    constructor() {
        this.roleService = new RoleService()
    }

    async getAllRoles(): Promise<RolePaginatedListResponseType> {
        const roles = await this.roleService.getAll();
        return {
            total: 5,
            hasMore: true,
            item: roles
        }
    }

    async createRole(payload: RoleInputType): Promise<MutationResponseType> {
        try {
            const role = await this.roleService.getOne({ name: payload.name });

            console.log("payloadpayloadpayload", payload)
            if (role) return {
                status: 400,
                message: "Role name already exist",
            }


            await this.roleService.create(payload);
            return {
                status: 200,
                message: "Role created succesfully",
            }
        } catch (error: any) {
            console.error(error)
            return {
                status: 500,
                message: error?.message
            }
        }
    }

    async update(payload: UpdateRoleInputType): Promise<MutationResponseType> {
        try {
            const { id, ...updateData } = payload;


            await this.roleService.update({ id, updateData })
            return {
                status: 200,
                message: "Role created succesfully",
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

export default RoleController;