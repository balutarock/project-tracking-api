//Service
import { ticketService } from "./service";

// Common
import { defaultDateFormat } from "../../common/utils";
import { isInteger } from "../../common/validator";

export default async (req, res) => {
    let { id } = req.params;

    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    ticketService
        .findOne({
            where,
        })
        .then((ticketDetails) => {
            if (!ticketDetails) {
                return res.status(400).send({ message: "Ticket not found" });
            }

            const {
                id,
                summary,
                project,
                status,
                eta,
                reporter,
                assignee,
                description,
                expected_result,
                createdAt,
                updatedAt,
            } = ticketDetails.get();

            const data = {
                id,
                summary,
                project,
                status,
                eta,
                reporter,
                assignee,
                description,
                expected_result,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send({ message: err.message }));
};
