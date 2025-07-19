import { environment } from "src/environments/environment";

export class Constants {
  
  private static readonly API_PATH = `${environment.apiBaseUrl}`;

  // AUTH
  public static readonly REGISTER_USER = `${this.API_PATH}/register`;
  public static readonly SIGN_IN_USER = `${this.API_PATH}/sign-in`;

  // USER
  public static readonly FIND_USER_INFO = `${this.API_PATH}/user/find-by-email`
}