import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1),
});

export const registerSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().trim().min(1),
});

export const postSchema = z.object({
  content: z.string().min(20),
});

export const commentSchema = z.object({
  content: z.string().min(10),
});
