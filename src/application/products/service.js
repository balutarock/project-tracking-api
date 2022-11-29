import models from "../../../db/models";
import DataBaseService from "../../../common/DataBaseService";

export const applicationProductService = new DataBaseService(
    models.application_products
);

export default {
    applicationProductService,
};
