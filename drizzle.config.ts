import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  driver: "turso",
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN
  },
  tablesFilter: ["gymstagram_*"],
} satisfies Config;
