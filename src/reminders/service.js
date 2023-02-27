import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const reminderService = new DataBaseService(models.reminder);

export default {
    reminderService,
};
