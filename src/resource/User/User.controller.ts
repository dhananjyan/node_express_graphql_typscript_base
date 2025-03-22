import UserService from "./User.service";
import { ServiceResponse } from "../../graphql/common.type";
import { LoginInputType, LoginResponseType, UpdateUserInputType, UserType, createUserInputType, UserPaginatedListResponseType, paginatedFilterUserInputType } from "./User.type";
import { createJwtToken } from "../../utils/jwt";
import RoleService from "../Role/Role.service";
import { IRole } from "../Role/Role.model";
import { normalizeFilteredInput } from "../../helper";

class UserController {

    userService: UserService
    roleService: RoleService
    constructor() {
        this.userService = new UserService()
        this.roleService = new RoleService()
    }

    async getAllUsers(payload: paginatedFilterUserInputType): Promise<UserPaginatedListResponseType> {

        let { limit, page, ...filters } = payload;

        const skip = (page - 1) * limit;

        let normalizedFilters = normalizeFilteredInput(filters);

        const users = await this.userService.getPaginated({
            filters: normalizedFilters,
            limit: 5,
            skip
        });
        console.log("users", users)
        return {
            item: users.data,
            total: users.total,
            hasMore: false
        }
    }

    async login(payload: LoginInputType): Promise<LoginResponseType> {
        try {
            let user = await this.userService.getOne({ email: payload.username });

            if (!user) // User not found
                return {
                    status: 500,
                    message: "Please try with correct username and password"
                }

            let isPasswordMatch = await user.comparePassword(payload.password);
            user = user.toObject();
            if (!isPasswordMatch)
                return {
                    status: 500,
                    message: "Please try with correct username and password"
                }
            const permissions = new Set();

            const roles = await this.roleService.getByRoleId(user.roles);
            if (roles?.length)
                roles.map(role => {
                    console.log("role", role)
                    let data = role.toObject()
                    data.permissions.map((item: String) => permissions.add(item))
                })

            let tokenData = {
                ...user,
                permissions: [...permissions]
            }

            let token = createJwtToken(tokenData);
            return {
                status: 200,
                message: "Logged in succesfully",
                data: {
                    ...user,
                    token
                }
            }

        } catch (error) {
            console.error(error)
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    }

    async createUser(payload: createUserInputType): Promise<ServiceResponse> {
        try {

            if (payload.roles?.length) { // validate roles
                let validRoles = await this.roleService.getByRoleId(payload.roles);
                if (payload.roles?.length !== validRoles?.length)
                    return {
                        status: 400,
                        message: "Role not exist"
                    }
            }

            let isEmailExist = await this.userService.getOne({ email: payload.email });
            if (isEmailExist)
                return {
                    status: 400,
                    message: "Email already exist"
                }

            await this.userService.create(payload);

            return {
                status: 200,
                message: "User created succesfully",
            }

        } catch (error: any) {
            console.error(error)
            return {
                status: 500,
                message: error?.message
            }
        }
    }

    async update(payload: UpdateUserInputType): Promise<ServiceResponse> {
        try {
            if (payload.roles?.length) { // validate roles
                let validRoles = await this.roleService.getByRoleId(payload.roles);
                if (payload.roles?.length !== validRoles?.length)
                    return {
                        status: 400,
                        message: "Role not exist"
                    }
            }

            const { id, ...updateData } = payload;
            await this.userService.update(id, updateData);
            return {
                status: 200,
                message: "User updated succesfully",
            }
        } catch (error: any) {
            console.error(error)
            return {
                status: 500,
                message: error?.message
            }
        }
    }

    async getUserRoles(payload: UserType): Promise<IRole[] | null> {
        try {
            const roles = await this.roleService.getByRoleId(payload.roles);
            return roles;

        } catch (error: any) {
            console.error(error)
            return []
        }
    }

}

export default UserController;