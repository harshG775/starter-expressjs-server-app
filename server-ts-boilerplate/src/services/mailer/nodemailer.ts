import nodemailer from "nodemailer";
import { config } from "@/constants";

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
export async function sendOTP(
    receiverEmails: string[],
    otp: number
): Promise<[error: Error | null, otp: number | null]> {
    // send mail with defined transport object
    const info = {
        from: `"hgaur491" <${SENDER_EMAIL}>`, // sender address
        to: receiverEmails.join(", "), // list of receivers
        subject: "verify your email", // Subject line
        text: `Your OTP code is ${otp}. It is valid for ${google_OtpExpire} minutes.`,
        html: `<p>Your OTP code is <b>${otp}</b>. It is valid for <b>${google_OtpExpire} minutes</b>.</p>`,
    };

    try {
        await transporter.sendMail(info);
        return [null, otp];
    } catch (error: any) {
        return [error, null];
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
