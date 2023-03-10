class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public userVacationsUrl = "http://localhost:3001/api/vacations-for-users/";
    public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
    public followersUrl = "http://localhost:3001/api/followers/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
