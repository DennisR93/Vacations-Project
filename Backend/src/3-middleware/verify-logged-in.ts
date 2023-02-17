import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

// Function to check if there is a token
async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {
        const isValid = await cyber.verifyToken(request);
        if (!isValid) throw new UnauthorizedErrorModel("You are not logged in!");
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyLoggedIn;