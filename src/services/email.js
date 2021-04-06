require('dotenv').config();
const { EMAIL_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

class EmailService {
    static createTransporter = async () => {
        const oauth2Client = new OAuth2(
            OAUTH_CLIENT_ID,
            OAUTH_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );
        oauth2Client.setCredentials({refresh_token: OAUTH_REFRESH_TOKEN});
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject();
                }
                resolve(token);
            });
        });

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                accessToken,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN
            }
        });
    };

    static async sendMail(to, subject, message) {
        const transporter = await this.createTransporter();
        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            html: `${message}<br/><br/><small>Please do not reply to this automated message.</small>`
        };

        return transporter.sendMail(mailOptions, error =>{
            if (error){
                return {success: false, error: error.message};
            } else {
                return {success: true};
            }
        });
    }
}

module.exports = EmailService;
