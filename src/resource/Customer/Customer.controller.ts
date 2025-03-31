import CustomerService from "./Customer.service";
import { ServiceResponse } from "../../graphql/common.type";
import { CustomerLoginInputType, CustomerLoginResponseType, UpdateCustomerInputType, createCustomerInputType, CustomerPaginatedListResponseType, paginatedFilterCustomerInputType } from "./Customer.type";
import { createJwtToken } from "../../utils/jwt";
import RoleService from "../Role/Role.service";
import { normalizeFilteredInput } from "../../helper";

class CustomerController {

    customerService: CustomerService
    roleService: RoleService
    constructor() {
        this.customerService = new CustomerService()
        this.roleService = new RoleService()
    }

    // *************************************
    // Query Controller
    // *************************************

    async getAllCustomers(payload: paginatedFilterCustomerInputType): Promise<CustomerPaginatedListResponseType> {

        let { limit, page, ...filters } = payload;

        const skip = (page - 1) * limit;

        let normalizedFilters = normalizeFilteredInput(filters);

        const users = await this.customerService.getPaginated({
            filters: normalizedFilters,
            limit: 5,
            skip
        });
        return {
            item: users.data,
            total: users.total,
            hasMore: false
        }
    }


    // *************************************
    // Mutation Controller
    // *************************************

    async login(payload: CustomerLoginInputType): Promise<CustomerLoginResponseType> {
        try {
            let user = await this.customerService.getOne({ email: payload.username });

            if (!user) // User not found
                return {
                    status: 400,
                    message: "Please try with correct username and password"
                }

            let isPasswordMatch = await user.comparePassword(payload.password);
            user = user.toObject();
            if (!isPasswordMatch)
                return {
                    status: 400,
                    message: "Please try with correct username and password"
                }

            let tokenData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: ["BUYERS"]
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

        } catch (error: any) {
            console.error(error)
            return {
                status: 500,
                message: error?.message
            }
        }
    }

    async create(payload: createCustomerInputType): Promise<ServiceResponse> {
        try {

            let isEmailExist = await this.customerService.getOne({ email: payload.email });
            if (isEmailExist)
                return {
                    status: 400,
                    message: "Email already exist"
                }

            await this.customerService.create(payload);

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

    async update(payload: UpdateCustomerInputType): Promise<ServiceResponse> {
        try {

            const { id, ...updateData } = payload;
            await this.customerService.update(id, updateData);
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

    // *************************************
    // Resolver Controller
    // *************************************

    // async getUserRoles(payload: CustomerType): Promise<IRole[] | null> {
    //     try {
    //         const roles = await this.roleService.getByIds(payload.roles);
    //         return roles;
    //     } catch (error: any) {
    //         console.error(error)
    //         return []
    //     }
    // }

}

export default CustomerController;