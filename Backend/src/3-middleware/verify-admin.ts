import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

// Function to check user role is Admin
async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try {
        const isAdmin = await cyber.verifyAdmin(request);
        if (!isAdmin) throw new UnauthorizedErrorModel("You are not an admin!");
        next();
    }
    catch (err: any) {
        next(err);
    }
}

export default verifyAdmin;