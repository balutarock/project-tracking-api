import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const attachmentTypeService = new DataBaseService(
    models.attachment_type
);

export const attachmentTypeRelationService = new DataBaseService(
    models.attachment_type_relation
);

export default {
    attachmentTypeService,
    attachmentTypeRelationService,
};
