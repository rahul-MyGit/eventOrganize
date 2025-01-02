
import {object, string, z} from 'zod';

const getPasswordSchema = (type: "password" | "confirmPassword") => 
    string({ required_error: `${type} is required`})
    .min(1, `${type} is required`)
    .min(8, `${type} must be at least 8 characters`)
    .max(32, `${type} must be at most 32 characters`);

const getEmailSchema = () => 
    string({ required_error: "Email is required"})
    .min(1, "Email is required")
    .email("Invalid email format");

const getNameSchema = () =>
    string({ required_error: "Name is required"})
    .min(1, "Name is required")
    .max(32, "Name must be at most 32 characters");

export const signupSchema = object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
    role: z.string().default("VENUE_OWNER"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"]
    });