//Service
import { applicationSupportHoursService } from "./service";

// Common
import { defaultDateFormat } from "../../../common/utils";
import { isInteger } from "../../../common/validator";

export default async (req, res) => {
    let { id } = req.params;
    if (!id) {
        id = req.params.id;
    }
    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    applicationSupportHoursService
        .findOne({
            where,
        })
        .then((appDetails) => {
            if (!appDetails) {
                return res
                    .status(400)
                    .send({ message: "Application not found" });
            }

            const {
                id,
                name,
                status,
                type,
                started_at,
                application_url,
                total_hour,
                spent_hour,
                remaining_hour,
                due_date,
                customer,
                createdAt,
                updatedAt,
            } = appDetails.get();

            const data = {
                id,
                name,
                status,
                type,
                started_at,
                application_url,
                total_hour,
                spent_hour,
                remaining_hour,
                due_date,
                customer,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
