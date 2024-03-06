import { pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const user = pgTable("user", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  username: varchar("username", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }),
  oauthToken: varchar("oauthToken", { length: 256 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  type: varchar("type", { length: 256 }),
  verified: boolean("verified").default(false),
});
