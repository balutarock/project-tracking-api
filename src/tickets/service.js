import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const ticketService = new DataBaseService(models.tickets);

export default {
    ticketService,
};
