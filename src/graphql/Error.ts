import { GraphQLError } from "graphql";

class Error extends GraphQLError {
    constructor(message: string, code: string = "INTERNAL_SERVER_ERROR") {
        super(message, {
            extensions: { code },
        });
    }
}

export default Error;