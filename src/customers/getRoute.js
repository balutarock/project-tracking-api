//Service
import { customerService } from "./service";

// Common
import { defaultDateFormat } from "../../common/utils";
import { isInteger } from "../../common/validator";

export default async (req, res) => {
    let { id } = req.params;

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

            const {
                id,
                name,
                email,
                status,
                primary_contact_name,
                primary_contact_email,
                primary_contact_phone,
                secondary_contact_name,
                secondary_contact_email,
                secondary_contact_phone,
                createdAt,
                updatedAt,
            } = customerDetails.get();

            const data = {
                id,
                name,
                email,
                status,
                primary_contact_name,
                primary_contact_email,
                primary_contact_phone,
                secondary_contact_name,
                secondary_contact_email,
                secondary_contact_phone,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
