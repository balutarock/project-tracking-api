//Service
import { reminderService } from "./service";

// Common
import { defaultDateFormat } from "../../common/utils";
import { isInteger } from "../../common/validator";

export default async (req, res) => {
    let { id } = req.query;
    if (!id) {
        id = req.params.id;
    }
    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    reminderService
        .findOne({
            where,
        })
        .then((appDetails) => {
            if (!appDetails) {
                return res.status(400).send({ message: "Reminder not found" });
            }

            const {
                id,
                name,
                status,
                appId,
                subject,
                description,
                remind_at,
                cc_email,
                to_email,
                createdAt,
                updatedAt,
            } = appDetails.get();

            const data = {
                id,
                name,
                status,
                appId,
                subject,
                description,
                remind_at,
                cc_email,
                to_email,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
