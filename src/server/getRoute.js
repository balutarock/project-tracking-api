//Service
import { serverService } from "./service";

// Common
import { defaultDateFormat } from "../../common/utils";
import { isInteger } from "../../common/validator";

export default async (req, res) => {
    let { id } = req.params;

    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    serverService
        .findOne({
            where,
        })
        .then((serverDetails) => {
            if (!serverDetails) {
                return res.status(400).send({ message: "Customer not found" });
            }

            const {
                id,
                name,
                status,
                node_version,
                server_root,
                server_specification,
                createdAt,
                updatedAt,
            } = serverDetails.get();

            const data = {
                id,
                name,
                status,
                node_version,
                server_root,
                server_specification,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
