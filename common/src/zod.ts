import z from "zod";

export const signUpBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type SignupInput = z.infer<typeof signUpBody>;

export const signInBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SigninInput = z.infer<typeof signInBody>;

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
