import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const customerService = new DataBaseService(models.customer);

export default {
    customerService,
};
