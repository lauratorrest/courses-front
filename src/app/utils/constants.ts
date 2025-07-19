export class Constants {
    private static readonly API_ADDRESS = 'http://localhost:8081';
    private static readonly API_PATH = this.API_ADDRESS + '/coursya/v1/api';

    //AUTH
    public static readonly REGISTER_USER = this.API_PATH + '/register';
    public static readonly SIGN_IN_USER = this.API_PATH + '/sign-in';
}