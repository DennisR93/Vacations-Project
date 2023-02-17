import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

// Function to check user role is User
async function verifyUser(request: Request, response: Response, next: NextFunction) {

    try {
        const isValid = await cyber.verifyUser(request);
        if (!isValid) throw new UnauthorizedErrorModel("You are not a user!");
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyUser;