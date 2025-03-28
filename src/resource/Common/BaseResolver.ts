import Error from "../../graphql/Error";

class BaseResolver {
    async response(data: any) {
        if (data?.status) {

            if (data?.status == 200)
                return data;
            else if (data?.status == 400)
                throw new Error(data?.message, "BAD_INPUT_ERROR")
            else if (data?.status == 500)
                throw new Error(data?.message, "INTERNAL_SERVER_ERROR")
        }
        return data;
    }
    async errorResponse(data: any) {
        if (data)
            throw new Error(data)
        return data;
    }
}

export default BaseResolver;
