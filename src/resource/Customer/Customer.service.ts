import BaseService from "../Common/BaseService";
import CustomerModel, { ICustomer } from "./Customer.model";
import { CustomerType } from "./Customer.type";

class UserService extends BaseService<ICustomer> {
    constructor() {
        super(CustomerModel);
    }

    async findByEmail(email: string): Promise<CustomerType | null> {
        return this.model.findOne({ email });
    }

}

export default UserService;