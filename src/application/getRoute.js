//Service
import { applicationService } from "./service";

// Common
import { defaultDateFormat } from "../../common/utils";
import { isInteger } from "../../common/validator";
import model from "../../db/models";

const { application_type } = model;

export default async (req, res) => {
    let { id } = req.query;
    if (!id) {
        id = req.params.id;
    }
    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    applicationService
        .findOne({
            where,
            include: [
                {
                    model: application_type,
                    as: "applicationType",
                },
            ],
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
                due_date,
                git_url,
                port,
                customer,
                server,
                applicationType,
                total_hour,
                spent_hour,
                remaining_hour,
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
                due_date,
                git_url,
                port,
                customer,
                server,
                total_hour,
                spent_hour,
                remaining_hour,
                applicationType,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
