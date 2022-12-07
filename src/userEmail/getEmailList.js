import { defaultDateFormat } from "../../common/utils";
import { userEmailService } from "./service";

export default async (req, res, next) => {
    const query = {
        attributes: { exclude: ["deletedAt"] },
    };

    // Get list and count
    userEmailService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (emailData) => {
                data.push({
                    id: emailData.id,
                    name: emailData.name,
                    email: emailData.email,
                    createdAt: defaultDateFormat(emailData.createdAt),
                    updatedAt: defaultDateFormat(emailData.updatedAt),
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
