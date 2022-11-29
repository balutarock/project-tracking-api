//Service
import { applicationProductService } from "./service";

// Common
import { defaultDateFormat } from "../../../common/utils";
import { isInteger } from "../../../common/validator";

export default async (req, res) => {
    let { id } = req.query;
    if (!id) {
        id = req.params.id;
    }
    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    applicationProductService
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
                due_date,
                git_url,
                port,
                customer,
                server,
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
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
