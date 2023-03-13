import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const workflowService = new DataBaseService(models.workflow);

export default {
    workflowService,
};
