import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `gymstagram_${name}`);

/**
 * USER SCHEMA
 */
export const users = createTable("user", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email", { length: 255 }).notNull(),
  name: text("name", { length: 255 }),
  username: text("username", { length: 255 }).notNull(),
  password: text("password", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

/**
 * WORKOUTS SCHEMA
 */
export const workout = createTable("workouts", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  createdBy: text("createdBy", { length: 255 })
    .notNull()
    .references(() => users.id),

  name: text("name", { length: 255 }).notNull(),

  time: int("time", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/**
 * POST SCHEMA
 */
export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdById: text("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
    image: text("image", { length: 255 }).notNull(),
    caption: text("caption", { length: 255 }),
    workoutDone: text("workoutDone", { length: 255 })
      .notNull()
      .references(() => workout.id),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
  }),
);

export const workoutRelations = relations(workout, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

/**
 * EXERCIESE SCHEMA
 */
export const exercise = createTable("exercise", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  createdBy: text("createdBy", { length: 255 })
    .notNull()
    .references(() => users.id),

  name: text("name", { length: 255 }).notNull(),
});

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [exercise.createdBy],
    references: [users.id],
  }),
  workoutExercises: many(workoutExercises),
}));

/**
 * MANY TO MANY WORKOUTEXERCISE SCHEMA
 */
export const workoutExercises = createTable(
  "workoutExercises",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    workout: text("workoutId", { length: 255 })
      .references(() => workout.id)
      .notNull(),
    exercise: text("exerciseId", { length: 255 })
      .references(() => exercise.id)
      .notNull(),

    time: int("time", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    weight: int("weight", { mode: "number" }).notNull(),
    reps: int("reps", { mode: "number" }).notNull(),
  },
  // (workoutExercises) => ({
  //   compoundKey: primaryKey({
  //     columns: [workoutExercises.workout, workoutExercises.exercise],
  //   }),
  // }),
);

export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one }) => ({
    workout: one(workout, {
      fields: [workoutExercises.workout],
      references: [workout.id],
    }),
    exercise: one(exercise, {
      fields: [workoutExercises.exercise],
      references: [exercise.id],
    }),
  }),
);

/**
 * GROUPS SCHEMA
 */
export const group = createTable("group", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 255 }).notNull(),

  photo: text("photo", { length: 255 }).notNull(),
});

/**
 * MANY TO MANY, WHERE A MANY GROUPS CAN HAVE MANY OF THE USERS EXERCISES GROUP EXERCISE SCHEMA
 */
export const groupExercises = createTable(
  "groupExercises",
  {
    group: text("group", { length: 255 })
      .references(() => group.id)
      .notNull(),

    exercise: text("exercise", { length: 255 })
      .references(() => exercise.id)
      .notNull(),
  },
  (groupExercises) => ({
    compoundKey: primaryKey({
      columns: [groupExercises.group, groupExercises.exercise],
    }),
  }),
);

/**
 * MANY TO MANY, WHERE A GROUPS CAN HAVE MANY USERS EXERCISE SCHEMA
 */
export const groupUsers = createTable(
  "groupUsers",
  {
    group: text("group", { length: 255 })
      .references(() => group.id)
      .notNull(),

    user: text("user", { length: 255 })
      .references(() => users.id)
      .notNull(),
  },
  (groupUsers) => ({
    compoundKey: primaryKey({
      columns: [groupUsers.group, groupUsers.user],
    }),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
