import { attachmentService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = attachmentService.toDbObject(data);
        await attachmentService.create(createData);
        res.status(200).send({ message: "Attachment Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
