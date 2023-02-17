import Joi from "joi";

// Followers Model
class FollowersModel {

    public constructor(public userId: number, public vacationId: number) { }

    public static validationSchema = Joi.object({
        userId: Joi.number().required().integer(),
        vacationId: Joi.number().required().integer(),
    });

    public validate(): string {
        const result = FollowersModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default FollowersModel;