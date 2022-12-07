import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const userEmailService = new DataBaseService(models.user_email);

export default {
    userEmailService,
};
