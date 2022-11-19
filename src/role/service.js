import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const roleService = new DataBaseService(models.role);

export const getRoleNameById = async (roleId) => {
    const roleDetails = await roleService.findOne({
        where: { id: parseInt(roleId) },
    });
    if (!roleDetails) {
        return null;
    }
    return roleDetails;
};

export default {
    roleService,
    getRoleNameById,
};
