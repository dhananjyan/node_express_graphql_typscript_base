import { RoleResolver } from "../resource/Role/Role.resolver";
import { UserResolver } from "../resource/User/User.resolver";
import { CategoryResolver } from "../resource/Category/Category.resolver";
import CustomerResolver from "../resource/Customer/Customer.resolver";
import ProductResolver from "../resource/Product/Product.resolver";

export default [
    UserResolver,
    RoleResolver,
    CategoryResolver,
    CustomerResolver,
    ProductResolver
] as const;