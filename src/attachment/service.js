import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const attachmentService = new DataBaseService(models.attachment);

export default {
    attachmentService,
};
