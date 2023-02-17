class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public imageName: string;
    public image: FileList;
    public followersCount: number;
    public isFollowing: number;

    public static destinationValidation = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "Destination too short" },
        maxLength: { value: 70, message: "Destination too long" }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 30, message: "Description too short" },
        maxLength: { value: 500, message: "Destination too long" }
    }

    public static checkInValidation = {
        required: { value: true, message: "Missing Check in date" }
    }

    public static checkOutValidation = {
        required: { value: true, message: "Missing Check out date" }
    }

    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 50, message: "Price must be at least 50!" },
        max: { value: 10000, message: "Price can't exceed 10000!" }
    }

    public static imageValidation = {
        required: { value: true, message: "Missing image!" }
    }


}

export default VacationModel;