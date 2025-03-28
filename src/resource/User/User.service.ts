import BaseService from "../Common/BaseService";
import UserModel, { IUser } from "./User.model";
import { UpdateUserInputType, UserPaginatedListResponseType, UserType, createUserInputType, paginatedFilterUserInputType } from "./User.type";

class UserService extends BaseService<IUser> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<UserType | null> {
        return this.model.findOne({ email });
    }

}

export default UserService;