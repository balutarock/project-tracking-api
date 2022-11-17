//Service
import { roleService } from "./service";

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

    roleService
        .findOne({
            where,
        })
        .then(roleDetails => {
            if (!roleDetails) {
                return res.status(400).send({ message: "Role not found" });
            }

            const { id, role_name, status } = roleDetails.get();

            const data = {
                id,
                role_name,
                status,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
