const API_VERSION = "/api/v1";
const rg = (rt: string) => {
  return API_VERSION + rt;
};
export const endpoints = {
  oauth_start_redirect_path: rg("/auth/login/google"),
  home: rg("/"),
  docs: rg("/docs"),
  // group : auth
  login: rg("/auth/login"),
  register: rg("/auth/register"),
  reset: rg("/auth/reset"),
  resetDyn: rg("/auth/reset/token"),
  // tfa: "/2fa",
  // disable2fa: "/2fa/disable",
  googleCallback: rg("/auth/callback/google"),
  logout: rg("/auth/logout"),
  // tfaLoginDyn:  groups.auth + "/login/2fa/:user",
  // tfaLogin:  groups.auth + "/login/2fa/",
  dashboard: rg("/dashboard"),
  // refreshsession: "/refresh",
};
export const TOKEN_NAME = "access_token";
export const cookiesConf = {
  path: "/",
  httpOnly: true,
  secure: true,
  maxAge: 1728000,
};
export const redisConf = {
  // sessionExp: 180,
  resetTokenExp: 300,
  tfaTokenExp: 300,
};
