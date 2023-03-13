//Service
import { applicationTypeService } from "./service";

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

    applicationTypeService
        .findOne({
            where,
        })
        .then((appDetails) => {
            if (!appDetails) {
                return res
                    .status(400)
                    .send({ message: "Application Type not found" });
            }

            const {
                id,
                name,
                status,
                show_application_url,
                show_customer,
                show_due_at,
                show_git_url,
                show_port_number,
                show_remaining_hours,
                show_server,
                show_spent_hours,
                show_started_at,
                show_total_hours,
                createdAt,
                updatedAt,
            } = appDetails.get();

            const data = {
                id,
                name,
                status,
                show_application_url,
                show_customer,
                show_due_at,
                show_git_url,
                show_port_number,
                show_remaining_hours,
                show_server,
                show_spent_hours,
                show_started_at,
                show_total_hours,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
