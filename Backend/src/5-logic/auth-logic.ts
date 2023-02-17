import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

// Function to register a user
async function register(user: UserModel): Promise<string> {

    // Validate if inserted correctly
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);

    // SQL Query 
    const userSql = "SELECT * FROM users";

    // Sending Query
    const users = await dal.execute(userSql);

    // Checking if username is already taken and return error - ID/Email/Username can't match to existing one!
    if (users.some(u => u.username === user.username)) {
        throw new ValidationErrorModel("Username already taken");
    }

    // Hash password:
    user.password = cyber.hash(user.password);

    // Declaring User role on creation
    user.roleId = RoleModel.user;

    // SQL Injection - hiding the information from query
    const sql = 'INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)';

    // Execute:
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.roleId]);

    // Insert id into the user
    user.userId = info.insertId;

    // Generating new token
    const token = cyber.getNewToken(user);

    return token;
}

// Login function
async function login(credentials: CredentialsModel): Promise<string> {

    // Validating if there is a user with this name
    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);

    // Hash password:
    credentials.password = cyber.hash(credentials.password);

    // SQL Injection blocked
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    // If user isn't found return error
    if (users.length === 0) throw new UnauthorizedErrorModel("Incorrect username or password");
    const user = users[0];
    const token = cyber.getNewToken(user);

    return token;
}

export default {
    register,
    login,
}