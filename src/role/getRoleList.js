import { defaultDateFormat } from "../../common/utils";
import { roleService } from "./service";

export default async (req, res, next) => {
    const query = {
        attributes: { exclude: ["deletedAt"] },
    };

    // Get list and count
    roleService
        .findAndCount(query)
        .then(async results => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async roleData => {
                data.push({
                    id: roleData.id,
                    role_name: roleData.role_name,
                    status: roleData.status,
                    createdAt: defaultDateFormat(roleData.createdAt),
                    updatedAt: defaultDateFormat(roleData.updatedAt),
                });
            });
            res.send({
                totalCount: results.count,
                data,
            });
        })
        .catch(err => {
            next(err);
        });
};
