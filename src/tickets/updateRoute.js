import { ticketService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;

    if (!id) {
        return res.status(400).send({ message: "Ticket Id is required" });
    }

    try {
        const updateData = ticketService.toDbObject(data);
        await ticketService.update(updateData, { where: { id: id } });

        res.status(200).send({
            message: "Ticket Updated Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
