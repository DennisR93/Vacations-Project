import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitize from "./3-middleware/sanitize";
import followersController from "./6-controllers/followers-controller";

const server = express();

// Defend against DoS attack:
server.use("/api/", expressRateLimit({
    max: 100, // Maximum requests
    windowMs: 1000, // Time window to allow the max requests.
    message: "Trying to hack this site?" // When performing more request - return this message
}));

// Helmet defense against malicious headers.
server.use(helmet(
    { crossOriginResourcePolicy: false }
));

// Limit CORS policy to our front end if data is not public to all world:
server.use(cors({ origin: appConfig.frontEndUrl }));

// Creates request.body object if exists
server.use(express.json())

// Sanitize request.body - remove HTML and script tags:
server.use(sanitize);

server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("/api", followersController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

