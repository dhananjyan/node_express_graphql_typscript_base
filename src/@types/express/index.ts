
declare global {
    namespace Express {
        interface Request {
            user?: any; // Adjust type based on your verifyJwtToken return type
        }
    }
}