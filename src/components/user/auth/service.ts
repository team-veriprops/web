import { HttpClient } from "@lib/http-client";
import { SocialAuthPlatform, SocialAuthOperationType, RedirectResponse } from "./models";



export class UserService {
    private readonly baseUrl = "/v1/users";
    
    constructor(private readonly http: HttpClient) {}

    async initSocialAuth(provider: SocialAuthPlatform, operation_type: SocialAuthOperationType): Promise<RedirectResponse> {
        return this.http.get<RedirectResponse>(`${this.baseUrl}/auths/socials/${provider}/init?operation_type=${operation_type}`);
    }
}
