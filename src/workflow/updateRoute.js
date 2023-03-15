import { workflowService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;
    if (!id) {
        return res.status(400).send({ message: "Attachment Id is required" });
    }

    try {
        const updateData = workflowService.toDbObject(data);
        await workflowService.update(updateData, {
            where: { id: id },
        });
        res.status(200).send({ message: "Attachment Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
