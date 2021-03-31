const { EMAIL_USER, EMAIL_PASSWORD, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;
const nodemailer = require('nodemailer');

class EmailService {
    static sendMail(to, subject, message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN
            }
        });
        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            html: `${message}<br/><br/><small>Please do not reply to this automated message.</small>`
        };
        return transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;
