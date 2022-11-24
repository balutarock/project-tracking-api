import { defaultDateFormat } from "../../common/utils";
import { serverService } from "./service";

export default async (req, res, next) => {
    const query = {
        attributes: { exclude: ["deletedAt"] },
    };

    // Get list and count
    serverService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (serverData) => {
                data.push({
                    id: serverData.id,
                    name: serverData.name,
                    status: serverData.status,
                    createdAt: defaultDateFormat(serverData.createdAt),
                    updatedAt: defaultDateFormat(serverData.updatedAt),
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
