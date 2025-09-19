export enum SocialAuthPlatform {
  APPLE = "apple",
  FACEBOOK = "facebook",
  GOOGLE = "google"
}

export enum SocialAuthOperationType {
  LOGIN = "login",
  SIGNUP = "signup"
}

export interface RedirectResponse {
  redirectUrl: string;
}
