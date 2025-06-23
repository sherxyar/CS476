import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

export function sendCode(to: string, code: string) {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'CPMS Two-factor Authentication Code',
        text: 'Your Two-factor authentication code is: ${code}',
    });
}