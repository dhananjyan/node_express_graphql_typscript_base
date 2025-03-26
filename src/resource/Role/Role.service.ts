import BaseService from "../Common/BaseService";
import { IRole, RoleModel } from "./Role.model"
import { RoleType, RoleInputType } from "./Role.type";
class RoleService extends BaseService<IRole> {
    constructor() {
        super(RoleModel)
    }


}

export default RoleService;