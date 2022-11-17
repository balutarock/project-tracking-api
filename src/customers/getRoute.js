//Service
import { customerService } from "./service";

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

    customerService
        .findOne({
            where,
        })
        .then((customerDetails) => {
            if (!customerDetails) {
                return res.status(400).send({ message: "Customer not found" });
            }

            const { id, name, email, status } = customerDetails.get();

            const data = {
                id,
                name,
                email,
                status,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
