import nodemailer from "nodemailer";

export async function sendEmail(to: string, code: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your Planova 2FA Login Code",
        text: `Your temporary login code is ${code}`,
    });
}