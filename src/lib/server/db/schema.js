import { pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name'),
	job: text('job'),
  	img: text('img'),
  	img_hover: text('img_hover'),
 	created_at: timestamp('created_at').defaultNow()
}).enableRLS();

export const partners = pgTable('partners', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name'),
	img: text('img'),
  	url: text('url'),
 	created_at: timestamp('created_at').defaultNow()
}).enableRLS();

export const blog_posts = pgTable('blog_posts', {
	id: uuid('id').primaryKey().defaultRandom(),
	slug: text('slug'),
	author: text('author'),
  	date: text('date'),
  	title: text('title'),
  	image: text('image'),
	content: text('content'),
 	created_at: timestamp('created_at').defaultNow()
}).enableRLS();

export const invite_tokens = pgTable('invite_tokens', {
    id: text('id').primaryKey(), // The actual token string
    expires_at: timestamp('expires_at').notNull(),
    created_by: text('created_by').notNull() // Track who made the invite
}).enableRLS();

export * from './auth.schema';
