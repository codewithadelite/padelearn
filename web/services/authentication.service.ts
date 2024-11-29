import APIService from "@/services/api.service";
import { ISignInCredentials, ISignInResponse } from "@/models/authentication";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class AuthenticationService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "accounts/";

    super(BASE_URL as string);
  }

  async signIn(data: ISignInCredentials): Promise<ISignInResponse> {
    return this.post("token/", data)
      .then((response) => {
        this.setAccessToken(response?.data?.access);
        this.setRefreshToken(response?.data?.refresh);
        this.setUserInfo(response?.data?.user);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signOut(data: { refresh_token: string }) {
    return this.post("sign-out/", data)
      .then((response) => {
        this.removeAccessToken();
        this.removeRefreshToken();
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new AuthenticationService();
