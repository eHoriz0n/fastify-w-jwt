import { db } from "../../config/drizzle-client";
import { Result, parseToResult } from "../../result.model";
import { RegisterData, RegisterOAuthType, userType } from "./auth.model";
import * as schema from "../../db/schema";
import { eq } from "drizzle-orm";
import csts from "src/config/consts";
import { hashPassword } from "src/lib/auth-utils/hash-password";
// Create new user in DB

export async function createOAuthUser(user: RegisterOAuthType) {
  try {
    const newUser = await db.insert(schema.user).values({
      username: user.username,
      oauthToken: user.oauthToken,
      email: user.email,
      type: csts.OAUTH,
    });

    console.log("yes");
    return parseToResult(newUser.command);
  } catch (error: any) {
    console.log("no");
    return parseToResult(undefined, error.constraint);
  }
}
export async function createUser(user: RegisterData) {
  try {
    const hash = await hashPassword(user.password);
    const newUser = await db.insert(schema.user).values({
      username: user.username,
      password: hash,
      email: user.email,
      type: csts.CREDENTIALS,
    });

    return parseToResult(newUser.command);
  } catch (error: any) {
    return parseToResult(undefined, error);
  }
}
// Get a user from DB
export async function getUser(
  email: string,
  includeId: boolean,
): Promise<Result<userType | undefined, Error | string | undefined>> {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
      columns: {
        id: includeId,
        username: true,
        password: true,
        oauthToken: true,
        email: true,
        type: true,
        verified: true,
      },
    });
    if (!user) {
      return parseToResult(undefined, "user doesn't exist");
    }
    return parseToResult(user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}
// Edit user's password
export async function editPassword(
  password: string,
  email: string,
): Promise<Result<string | undefined | null, Error | string | undefined>> {
  try {
    const hash = await hashPassword(password);

    const user = await db
      .update(schema.user)
      .set({ password: hash })
      .where(eq(schema.user.email, email))
      .returning({ userEmail: schema.user.email });
    return parseToResult(user[0]?.userEmail);
  } catch (error) {
    return parseToResult(undefined, "user doesn't exist");
  }
}
// Edit 2FA state
// export async function edit2fa(
//   email: string,
//   tfaemail: string | null,
//   type: boolean,
// ): Promise<Result<tfaType | undefined | null, Error | string | undefined>> {
//   try {
//     const user = await db
//       .update(schema.user)
//       .set({ twoFaEmail: tfaemail, TWO_FA: type })
//       .where(eq(schema.user.email, email))
//       .returning({
//         usertfaEmail: schema.user.twoFaEmail,
//         tfa: schema.user.TWO_FA,
//       });
//     if (!user[0]) {
//       return parseToResult(undefined, "user doesn't exist");
//     }
//
//     return parseToResult(user[0]);
//   } catch (error) {
//     return parseToResult(undefined, error as Error);
//   }
//
