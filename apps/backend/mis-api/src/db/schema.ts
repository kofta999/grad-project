import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = sqliteTable('users', {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  password: text({ length: 20 }).notNull()
})

export const selectUsersSchema = createSelectSchema(users);
export const insertUsersSchema = createInsertSchema(users,
  { username: schema => schema.username.min(3), password: schema => schema.password.min(6) })
  .omit({ id: true });


export const tasks = sqliteTable('tasks', {
  id: integer({ mode: 'number' })
    .primaryKey({ autoIncrement: true }),
  name: text()
    .notNull(),
  done: integer({ mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: integer({ mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

export const selectTasksSchema = createSelectSchema(tasks)

export const insertTasksSchema = createInsertSchema(tasks, { name: schema => schema.name.min(1).max(500) })
  .required({ done: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })

export const patchTasksSchema = insertTasksSchema.partial()
