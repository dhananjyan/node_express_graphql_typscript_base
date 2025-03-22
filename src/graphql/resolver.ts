import { RoleResolver } from "../resource/Role/Role.resolver";
import { UserResolver } from "../resource/User/User.resolver";
import { CategoryResolver } from "../resource/Category/Category.resolver";

export default [
    UserResolver,
    RoleResolver,
    CategoryResolver
] as const;