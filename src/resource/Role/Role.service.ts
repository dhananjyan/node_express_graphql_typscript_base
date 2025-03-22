import { IRole, RoleModel } from "./Role.model"
import { RoleType, RoleInputType } from "./Role.type";
class RoleService {
    async getAll(): Promise<RoleType[]> {
        return RoleModel.find();
    }

    async getOne(condition: { name: string }): Promise<RoleType | null> {
        return RoleModel.findOne(condition);
    }

    async getByRoleId(roles: String[]): Promise<IRole[] | null> {
        return RoleModel.find({
            _id: {
                $in: roles
            }
        });
    }

    async create(payload: RoleInputType): Promise<RoleType> {
        const role = new RoleModel(payload);
        return role.save();
    }

    async update(payload: { id: string, updateData: any }) {
        const { id, updateData } = payload;
        return RoleModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        // return role.save();
    }
}

export default RoleService;