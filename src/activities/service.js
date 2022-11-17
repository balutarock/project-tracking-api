import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const activityService = new DataBaseService(models.activity);

export default {
    activityService,
};
