import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const applicationService = new DataBaseService(models.application);

export default {
    applicationService,
};
