import { attachmentService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const appId = data.appId;
    if (!appId) {
        return res.status(400).send({ message: "Attachment Id is required" });
    }

    try {
        const updateData = attachmentService.toDbObject(data);
        await attachmentService.update(updateData, {
            where: { id: appId },
        });
        res.status(200).send({ message: "Attachment Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
