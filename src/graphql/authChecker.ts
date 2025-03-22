import { type AuthChecker } from "type-graphql";
import { type Context } from "./common.type";

// Auth checker function
export const authChecker: AuthChecker<Context> = ({ context: { user } }, permissions) => {

    // Check user
    if (!user) // No user, restrict access
        return false;

    // Check '@Authorized()'
    if (permissions.length === 0) // Only authentication required
        return true;
    // return false
    // Check '@Authorized(...)' roles overlap
    return !!user?.permissions?.some((permission: string) => permissions.includes(permission));
};