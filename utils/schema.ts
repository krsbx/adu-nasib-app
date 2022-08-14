import z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordError =
  'Password harus memiliki minimal 8 karakter, terdiri dari 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter spesial';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().trim().min(1, 'Password tidak boleh kosong'),
});

export const registerSchema = z.object({
  username: z.string().min(5, 'Username harus lebih dari 5 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().trim().regex(passwordRegex, passwordError),
});

export const postSchema = z.object({
  content: z.string().min(20),
});

export const commentSchema = z.object({
  content: z.string().min(10),
});

export const searchSchema = z.object({
  keyword: z.string().min(3, 'Kata kunci harus lebih dari 3 karakter'),
});
