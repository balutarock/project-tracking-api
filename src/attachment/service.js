import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

const { attachment_type_relation } = models;

export const attachmentService = new DataBaseService(models.attachment);

export const getAttachmentTypeRelation = async (roleId) => {
    let ids = [];
    const data = await attachment_type_relation.findAll({
        where: {
            allowed_role: roleId,
        },
    });
    data &&
        data.forEach((element) => {
            ids.push(element.type_id);
        });
    if (ids) {
        return ids;
    } else {
        return false;
    }
};
export default {
    attachmentService,
    getAttachmentTypeRelation,
};
