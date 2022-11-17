import { defaultDateFormat } from "../../common/utils";
import { roleService } from "../role/service";
import { settingService } from "./service";

export default async (req, res, next) => {
    const roleId = req.user.role_id;
    const query = {
        attributes: { exclude: ["deletedAt"] },
    };

    // Get list and count
    settingService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const roleSettings = await roleService.findOne({
                where: { id: roleId },
            });
            const settings = [];
            let roleSetting = {};
            await results.rows.forEach(async (settingData) => {
                settings.push({
                    id: settingData.id,
                    name: settingData.name,
                    value: settingData.value,
                    createdAt: defaultDateFormat(settingData.createdAt),
                    updatedAt: defaultDateFormat(settingData.updatedAt),
                });
            });

            (roleSetting.id = roleSettings && roleSettings.id),
                (roleSetting.role_name =
                    roleSettings && roleSettings.role_name),
                (roleSetting.status = roleSettings && roleSettings.status),
                (roleSetting.create_customer =
                    roleSettings && roleSettings.create_customer),
                (roleSetting.create_user =
                    roleSettings && roleSettings.create_user),
                (roleSetting.delete_customer =
                    roleSettings && roleSettings.delete_customer),
                (roleSetting.delete_user =
                    roleSettings && roleSettings.delete_user),
                (roleSetting.edit_customer =
                    roleSettings && roleSettings.edit_customer),
                (roleSetting.edit_user =
                    roleSettings && roleSettings.edit_user),
                (roleSetting.view_customer =
                    roleSettings && roleSettings.view_customer),
                (roleSetting.view_user =
                    roleSettings && roleSettings.view_user),
                (roleSetting.create_applications =
                    roleSettings && roleSettings.create_applications),
                (roleSetting.create_server =
                    roleSettings && roleSettings.create_server),
                (roleSetting.delete_applications =
                    roleSettings && roleSettings.delete_applications),
                (roleSetting.delete_server =
                    roleSettings && roleSettings.delete_server),
                (roleSetting.edit_applications =
                    roleSettings && roleSettings.edit_applications),
                (roleSetting.edit_server =
                    roleSettings && roleSettings.edit_server),
                (roleSetting.view_applications =
                    roleSettings && roleSettings.view_applications),
                (roleSetting.view_server =
                    roleSettings && roleSettings.view_server),
                res.send({
                    settings,
                    roleSetting,
                });
        })
        .catch((err) => {
            next(err);
        });
};
