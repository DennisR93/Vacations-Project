import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

// Catch all errors middleware and log them to a file
function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    console.log(err);

    const status = err.status || 500;

    if (status === 500) {

        logger.logError("catchAll error", err);

    }

    const message = appConfig.isDevelopment || status !== 500 ? err.message : "Some error occurred, please try again.";

    response.status(status).send(message);
}

export default catchAll;
