import { ticketService } from "./service";
import { createActivity } from "../activities/createActivity";

export default async (req, res, next) => {
    const data = req.body;

    try {
        const createData = ticketService.toDbObject(data);
        createData.reporter = req && req.user.id;
        await ticketService.create(createData).then((response) => {
            createActivity(
                req,
                "Ticket",
                "Created",
                response.name,
                response.id
            );
        });
        res.status(200).send({
            message: "Ticket Created Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
