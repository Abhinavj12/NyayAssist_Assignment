import { z } from "zod"
import { Priority, Status } from "@/types/todo"

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val) return null
      // Parse the date string and return as Date object
      const date = new Date(val)
      return isNaN(date.getTime()) ? null : date
    }),
  dueTime: z.string().optional().nullable(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
})

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
