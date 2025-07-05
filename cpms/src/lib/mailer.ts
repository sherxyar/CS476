import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gamil",
    auth: {
        user: process.env.MASTER_EMAIL,
        pass: process.env.MASTER_PASS
    }
});

export async function sendEmail(to: string, code: string) {
    await transporter.sendMail({
        from: process.env.MASTER_EMAIL,
        to,
        subject: "Your InfraPro 2FA Code",
        text: `Your temporary 2FA code is ${code}. It is valid for the next 2 minutes.`
    });
}