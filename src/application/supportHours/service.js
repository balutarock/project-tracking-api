import models from "../../../db/models";
import DataBaseService from "../../../common/DataBaseService";

export const applicationSupportHoursService = new DataBaseService(
    models.application_supporthours
);

export default {
    applicationSupportHoursService,
};
