import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const applicationTypeService = new DataBaseService(
    models.application_type
);

export default {
    applicationTypeService,
};
