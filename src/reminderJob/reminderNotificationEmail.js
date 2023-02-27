import {
    SETTINGS_FROM_EMAIL_ID,
    SETTINGS_SENDGRID_API_KEY,
} from "../settings/Constant";
import { getSystemSettingValue } from "../settings/service";
const sendgrid = require("@sendgrid/mail");

export const sendReminderNotificationMail = async (data) => {
    if (data && data.status !== "active") {
        return;
    } else {
        const sendGridAPIKey = await getSystemSettingValue(
            SETTINGS_SENDGRID_API_KEY
        );
        const fromEmail = await getSystemSettingValue(SETTINGS_FROM_EMAIL_ID);
        sendgrid.setApiKey(sendGridAPIKey);
        const emailSubject = data.subject;
        const emailDescription = data.description;
        const to_email = data.to_email;
        const cc_email = data.cc_email;
        try {
            await sendgrid.send({
                to: to_email,
                from: fromEmail,
                cc: cc_email,
                subject: `${emailSubject}`,
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>The HTML5 Herald</title>
                    <meta name="description" content="The HTML5 Herald">
                    <meta name="author" content="SitePoint">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <link rel="stylesheet" href="css/styles.css?v=1.0">
                </head>
                <body>
                   <p> ${emailDescription}</p>
            
                </body>
            </html>`,
            });
        } catch (error) {
            return console.log("email notification send error ------>", error);
        }
    }
};
