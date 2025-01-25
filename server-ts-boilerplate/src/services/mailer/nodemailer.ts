import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import { config } from "@/constants";
import { ResponseError } from "@/exception";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { to } from "@/utils";

const SENDER_EMAIL = config.mailer.senderEmail;
const google_Pass = config.mailer.googlePass;
const google_OtpExpire = config.mailer.optExpiresIn_minutes;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SENDER_EMAIL,
        pass: google_Pass,
    },
});
// async..await is not allowed in global scope, must use a wrapper
export async function sendOTP(receiverEmails: string[], otp: number): Promise<SentMessageInfo | undefined> {
    const info = {
        from: `"hgaur491" <${SENDER_EMAIL}>`, // sender address
        to: receiverEmails.join(", "), // list of receivers
        subject: "verify your email", // Subject line
        text: `Your OTP code is ${otp}. It is valid for ${google_OtpExpire} minutes.`,
        html: `<p>Your OTP code is <b>${otp}</b>. It is valid for <b>${google_OtpExpire} minutes</b>.</p>`,
    };

    const [error, response] = await to(transporter.sendMail(info));
    if (response) {
        return response;
    }
    if (error) {
        console.log(error);
        throw new ResponseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            errors: [
                {
                    message: "error while sending otp",
                },
            ],
        });
    }
}

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// (async () => {
//     const OTP = generateOTP(); // Generate OTP

//     const toEmail = ["kesol19150@maonyn.com"];
//     const [error, otp] = await sendOTP(toEmail, parseInt(OTP));
//     if (error) {
//         console.error("Failed to send OTP:", error);
//         return;
//     }
//     console.log("Generated OTP:", otp);
// })();
