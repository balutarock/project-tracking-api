import { defaultDateFormat } from "../../common/utils";
import { customerService } from "./service";

export default async (req, res, next) => {
    const query = {
        attributes: { exclude: ["deletedAt"] },
    };

    // Get list and count
    customerService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (customerData) => {
                data.push({
                    id: customerData.id,
                    name: customerData.name,
                    status: customerData.status,
                    createdAt: defaultDateFormat(customerData.createdAt),
                    updatedAt: defaultDateFormat(customerData.updatedAt),
                });
            });
            res.send({
                totalCount: results.count,
                data,
            });
        })
        .catch((err) => {
            next(err);
        });
};
