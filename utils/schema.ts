import z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  'Password harus memiliki minimal 8 karakter, terdiri dari 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter spesial';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  username: z.string().min(5, 'Username harus lebih dari 5 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().trim(),
});

export const postSchema = z.object({
  content: z.string().min(20),
});

export const commentSchema = z.object({
  content: z.string().min(10),
});
