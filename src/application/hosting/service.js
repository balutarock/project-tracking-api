import models from "../../../db/models";
import DataBaseService from "../../../common/DataBaseService";

export const applicationHostingService = new DataBaseService(
    models.application_hosting
);

export default {
    applicationHostingService,
};
