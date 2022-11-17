import { baseUrl, reactAppBaseUrl } from "../../config";
import createActivity from "../activities/createActivity";
import { getRoleNameById } from "../role/service";
import { SETTINGS_SENDGRID_API_KEY } from "../settings/Constant";
import { getSystemSettingValue } from "../settings/service";
import { isSuperAdmin, userService } from "./service";
const sendgrid = require("@sendgrid/mail");

export const inviteUserByEmail = async (req, res, data) => {
    if (isSuperAdmin(req)) {
        const email = data.email;
        const role = await getRoleNameById(data && data.role_id);
        const name = data.first_name;
        const token = Math.floor(Date.now());
        const signUpLink = `${reactAppBaseUrl}/sign-up/${token}&${email}&${data.role_id}`;
        const updateData = {
            token: token,
            status: "invited",
        };
        await userService.update(updateData, {
            where: { email: email },
        });

        const sendGridAPIKey = await getSystemSettingValue(
            SETTINGS_SENDGRID_API_KEY
        );
        sendgrid.setApiKey(sendGridAPIKey);

        try {
            await sendgrid.send({
                to: `${email}`, // Your email where you'll receive emails
                from: "people@saasly.in", // your website email address here
                subject: "User Invitation",
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
                       <p> Hi ${name}, Good Day!</p><br></br>
                       <p> You are invited to the Saasly Portal as a ${
                           role.role_name
                       }. Please follow the link to navigate to the signup page.</p>
                       <p> Link: ${encodeURI(signUpLink)}
                    </body>
                </html>`,
            });
        } catch (error) {
            return console.log(error);
        }
    }
};
