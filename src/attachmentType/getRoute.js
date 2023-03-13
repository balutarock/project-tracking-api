//Service
import { attachmentTypeService } from "./service";

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

    attachmentTypeService
        .findOne({
            where,
        })
        .then((appDetails) => {
            if (!appDetails) {
                return res
                    .status(400)
                    .send({ message: "Attachment Type not found" });
            }

            const { id, name, status, allowed_roles, createdAt, updatedAt } =
                appDetails.get();

            const data = {
                id,
                name,
                status,
                allowed_roles,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
