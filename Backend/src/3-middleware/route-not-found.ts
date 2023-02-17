import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../4-models/error-models";

// Creating an error for non existing route
function routeNotFound(request: Request, response: Response, next: NextFunction) {

    const err = new RouteNotFoundErrorModel(request.originalUrl);

    next(err);
}

export default routeNotFound;
