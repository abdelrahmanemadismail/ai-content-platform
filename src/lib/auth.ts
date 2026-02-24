import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

const buildAuthConfig = (allowSignup: boolean) => ({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: !allowSignup,
  },
});

export const auth = betterAuth(buildAuthConfig(false));

export const createAuth = (options?: { allowSignup?: boolean }) =>
  betterAuth(buildAuthConfig(Boolean(options?.allowSignup)));
