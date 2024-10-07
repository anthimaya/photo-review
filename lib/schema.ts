import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  topic: text('topic'),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  photoId: integer('photo_id').references(() => photos.id),
  userId: integer('user_id').references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});