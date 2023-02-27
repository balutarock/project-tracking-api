import { getSystemSettingValue } from "../../src/settings/service";
import { reminderService } from "../reminders/service";
import { defaultDateFormat } from "../../common/utils";
import { sendReminderNotificationMail } from "./reminderNotificationEmail";

export const scheduler = async () => {
    const reminderTime = await getSystemSettingValue("run_reminder_at");
    setInterval(data, reminderTime);
    data();
};

const data = async () => {
    const reminderTime = await getSystemSettingValue("run_reminder_at");
    console.log(`This function runs every ${reminderTime}.`);
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
                    sendReminderNotificationMail(reminderData);
                }
            });
        });
    } catch (error) {
        res.status(400).send({ message: error });
    }
};
