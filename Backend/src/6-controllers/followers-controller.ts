import express, { Request, Response, NextFunction } from "express";
import verifyUser from "../3-middleware/verify-user";
import FollowersModel from "../4-models/followers-model";
import followersLogic from "../5-logic/followers-logic";

const router = express.Router();

// POST http://localhost:3001/api/followers
router.post("/followers", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.body.userId;
        const vacationId = +request.body.vacationId;
        const follower = new FollowersModel(userId, vacationId);
        const addedFollower = await followersLogic.addFollower(follower);
        response.status(201).json(addedFollower);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/followers/:vacationId/:userId
router.delete("/followers/:vacationId([0-9]+)/:userId([0-9]+)", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await followersLogic.deleteFollower(vacationId, userId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;