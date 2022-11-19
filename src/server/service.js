import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const serverService = new DataBaseService(models.server);

export default {
    serverService,
};
