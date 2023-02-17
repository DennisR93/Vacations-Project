import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: RoleModel;

    public static firstNameValidation = {
        required: { value: true, message: "Missing first name!" },
        minLength: { value: 2, message: "First name must be at least two chars" },
        maxLength: { value: 20, message: "First name can't be more than 20 chars" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Missing last name!" },
        minLength: { value: 2, message: "Last name must be at least two chars" },
        maxLength: { value: 30, message: "Last name can't be more than 20 chars" }
    }

    public static usernameValidation = {
        required: { value: true, message: "Missing username" },
        minLength: { value: 2, message: "Username must be at least 2 chars" },
        maxLength: { value: 20, message: "Username can't exceed 20 chars" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password!" },
        minLength: { value: 4, message: "Password must be at least 4 chars" },
        maxLength: { value: 12, message: "Password can't exceed 12 chars!" }
    }
}

export default UserModel;