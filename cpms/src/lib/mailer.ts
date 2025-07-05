import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gamil",
    auth: {
        user: process.env.MASTER_EMAIL,
        pass: process.env.MASTER_PASS
    }
});

export async function sendEmail(to: string, subject: string, text: string) {
    await transporter.sendMail({
        from: process.env.MASTER_EMAIL,
        to,
        subject,
        text
    });
}