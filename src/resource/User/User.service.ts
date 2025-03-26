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
    // async getAll(): Promise<UserType[]> {
    //     return UserModel.find();
    // }

    // async getOne({ email }: { email?: string }): Promise<IUser | null> {
    //     return UserModel.findOne({
    //         email
    //     })
    // }

    // async create(payload: createUserInputType): Promise<IUser> {
    //     const user = new UserModel(payload);
    //     return user.save();
    // }

    // async update(payload: UpdateUserInputType): Promise<any> {
    //     return UserModel.updateOne({ _id: payload.id }, { $set: payload });
    // }



}

export default UserService;