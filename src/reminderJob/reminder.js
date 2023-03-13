import { getSystemSettingValue } from "../../src/settings/service";
import { reminderService } from "../reminders/service";
import { defaultDateFormat } from "../../common/utils";
import { sendReminderNotificationMail } from "./reminderNotificationEmail";
import { postMessage } from "../reminders/slackMessage";
import { createActivity } from "../activities/createActivity";
const CronJob = require("cron").CronJob;
const cron = require("node-cron");

export const scheduler = async () => {
    // Schedule a cron job to run every day at 10 am
    // cron.schedule("0 10 * * *", () => {
    cron.schedule("*/2 * * * *", () => {
        console.log("Running cron job at 10 am every day");

        const query = {
            attributes: { exclude: ["deletedAt"] },
        };
        try {
            // Get list and count
            reminderService.findAndCount(query).then(async (results) => {
                const today = defaultDateFormat(new Date());
                await results.rows.forEach(async (reminderData) => {
                    const remindAt = reminderData.dataValues.remind_at;
                    const reminderDate = defaultDateFormat(new Date(remindAt));
                    if (today == reminderDate) {
                        // sendReminderNotificationMail(reminderData);
                        reminderData.dataValues.send_slack_notification ==
                        "true"
                            ? postMessage(
                                  `<!channel> Sent reminder  ${reminderData.dataValues.name}`
                              )
                            : "";
                    }
                    createActivity(
                        0,
                        "Reminder",
                        "Sent",
                        reminderData.dataValues.name,
                        reminderData.dataValues.id
                    );
                });
            });
        } catch (error) {
            res.status(400).send({ message: error });
        }
    });
};
