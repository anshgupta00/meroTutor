import { z } from "zod";

export const requestTutorSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  mode: z.enum(["home", "online"], {
    error: "Please select a learning mode",
  }),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
});

export const demoClassSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  mode: z.enum(["home", "online"], {
    error: "Please select a class mode",
  }),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().min(10, "Please describe how we can help"),
});

export type RequestTutorFormData = z.infer<typeof requestTutorSchema>;
export type DemoClassFormData = z.infer<typeof demoClassSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
