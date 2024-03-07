// auth.js
import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import {
  TOKEN_NAME,
  cookiesConf,
  endpoints,
} from "../../../config/default.config";
import { createOAuthUser, getUser } from "../auth.services";
import { UserPayload } from "@plugins/authenticator";
export default async function (fastify: any) {
  // Define a route for Google OAuth2 callback
  try {
    fastify.get(
      endpoints.googleCallback,
      { preHandler: fastify.authorize },
      async function (req: FastifyRequest, res: FastifyReply) {
        // Fastify instance gets decorated with this method on OAuth plugin initialization
        const { token } =
          await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
            req,
          );

        //get the user info from google
        const userInfoResponse = await axios.get(
          process.env.OAUTH_USERINFO_URL as string,
          { headers: { Authorization: `Bearer ${token.access_token}` } },
        );

        const user = await userInfoResponse.data;
        const existingUser = await getUser(user.email, false);
        let payload: UserPayload;
        if (!existingUser.success) {
          await createOAuthUser({
            username: user.name,
            email: user.email,
            oauthToken: user.id,
          });
          payload = {
            email: user.name,
            username: user.email,
            verified: false,
          };
        } else {
          payload = {
            email: existingUser?.data?.email as string,
            username: existingUser?.data?.username as string,
            verified: existingUser?.data?.verified as boolean,
          };
        }
        const tokenjwt = req.jwt.sign(payload);
        res.setCookie(TOKEN_NAME, tokenjwt, cookiesConf);

        //redirect the user to a protected route
        res.redirect(process.env.API_URL);
      },
    );
  } catch (err) {
    console.log(err);
  }
}

// OAUTH2
