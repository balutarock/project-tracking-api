import { createAttachmentTypeRelation } from "./createRoute";
import { attachmentTypeService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;
    if (!id) {
        return res
            .status(400)
            .send({ message: "Attachment Type Id is required" });
    }

    try {
        const updateData = attachmentTypeService.toDbObject(data);
        await attachmentTypeService
            .update(updateData, {
                where: { id: id },
            })
            .then(async (response) => {
                const attachmentTypeDetails =
                    await attachmentTypeService.findOne({
                        where: { id: id },
                    });

                createAttachmentTypeRelation(req, attachmentTypeDetails);
            });
        res.status(200).send({
            message: "Attachment Type Updated Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
