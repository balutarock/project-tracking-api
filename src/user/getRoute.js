//Service
import { userService } from "./service";

// Common
import { defaultDateFormat, getUserMediaUrl } from "../../common/utils";
import { getRoleNameByRoleId } from "../../common/roles";
import { isInteger } from "../../common/validator";

export default async (req, res) => {
    let { id } = req.params;

    const where = {};
    if (req.user && !id) {
        where.id = req.user.id;
    } else if (isInteger(id)) {
        where.id = id;
    }

    if (!req.isSuperAdmin && id && req.user && !(req.user.id == id)) {
        res.status(404).send({ message: "Page not found" });
    }

    userService
        .findOne({
            attributes: [
                "id",
                "first_name",
                "last_name",
                "email",
                "last_loggedin_at",
                "role_id",
                "avatar",
                "slack_id",
                "createdAt",
                "updatedAt",
            ],
            where,
        })
        .then((userDetails) => {
            if (!userDetails) {
                return res.status(400).send({ message: "User not found" });
            }

            const {
                id,
                first_name,
                last_name,
                email,
                role_id,
                avatar,
                slack_id,
                last_loggedin_at,
                createdAt,
                updatedAt,
            } = userDetails.get();

            const data = {
                id,
                firstName: first_name,
                lastName: last_name,
                email,
                slack_id,
                roleId: role_id,
                roleName: role_id && getRoleNameByRoleId(parseInt(role_id, 10)),
                avatar,
                avatarUrl: avatar ? getUserMediaUrl(avatar) : "",
                lastLoggedinAt: defaultDateFormat(last_loggedin_at),
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
