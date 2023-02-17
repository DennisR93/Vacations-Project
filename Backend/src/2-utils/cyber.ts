import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../4-models/user-model";
import crypto from "crypto";
import RoleModel from "../4-models/role-model";

const jwtSecretKey = "VacationProjectReact";

function getNewToken(user: UserModel): string {

    // Deleting password, not shown on front end
    delete user.password;

    // Creating container for user data
    const container = { user };
    // Options on session storage - expiration after 3H
    const options = { expiresIn: "3h" };
    // Creating toker
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

// Verifying user token
function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

// Verify if user is Admin
async function verifyAdmin(request: Request): Promise<boolean> {
    const isLoggedIn = await verifyToken(request);

    if (!isLoggedIn) return false;

    const header = request.header("authorization");
    const token = header.substring(7);

    const container: any = jwt.decode(token);

    const user: UserModel = container.user;

    return user.roleId === RoleModel.admin;

}

// Verify if user is User
async function verifyUser(request: Request): Promise<boolean> {
    const isLoggedIn = await verifyToken(request);

    if (!isLoggedIn) return false;

    const header = request.header("authorization");
    const token = header.substring(7);

    const container: any = jwt.decode(token);

    const user: UserModel = container.user;

    return user.roleId === RoleModel.user;

}

// Salting password - another layer of protection
const salt = "AssafPleaseGiveMe100";

// Hashing function - generating hashed password
function hash(plainText: string): string {
    if (!plainText) return null;

    // Hash with salt:
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}


export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    verifyUser,
    hash
};
