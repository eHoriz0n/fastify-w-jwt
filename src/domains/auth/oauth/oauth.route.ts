// auth.js
import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { endpoints, cookiesConf } from "../../../config/default.config";
import { createOAuthUser, getUser } from "../auth.services";
import { RouteResponse } from "src/shared/models";
export default async function (fastify: any) {
  // Define a route for Google OAuth2 callback
  try {
    fastify.get(
      endpoints.googleCallback,
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
        if (!existingUser.success) {
          await createOAuthUser({
            username: user.name,
            email: user.email,
            oauthToken: user.id,
          });
        }
        req.session.authenticated = true;

        //redirect the user to a protected route
        res.redirect(process.env.API_URL);
      },
    );
  } catch (err) {
    console.log(err);
  }
  fastify.get(
    endpoints.logout,
    {
      schema: {
        response: {
          200: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },

    async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.session.authenticated) {
        request.session.destroy((err: any) => {
          if (err) {
            return reply.status(500).send("Internal Server Error");
          } else {
            reply.redirect("/");
          }
        });
      } else {
        return reply.status(500).send("Internal Server Error");
      }
    },
  );
}

// OAUTH2
