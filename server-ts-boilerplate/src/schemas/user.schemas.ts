import { z } from "zod";

const userRegistrationSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

const verificationSendSchema = z.object({
    email: z.string().email(),
});
const verificationVerifySchema = z.object({
    otp: z.string(),
    otpKey: z.string(),
});

const userLoginSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export { userRegistrationSchema, verificationSendSchema, verificationVerifySchema, userLoginSchema };
