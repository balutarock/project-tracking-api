// import service
import { createActivity } from "../activities/createActivity";
import { attachmentTypeService } from "./service";
import models from "../../db/models";

const { attachment } = models;
export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res
            .status(400)
            .send({ message: "Attachment Type Id is required" });
    }

    try {
        //  Get Attachment Type Details
        const attachmentTypeDetails = await attachmentTypeService.findOne({
            where: { id },
        });

        // Attachment Type Not Found
        if (!attachmentTypeDetails) {
            return res
                .status(400)
                .send({ message: "Attachment Type not found" });
        }
        // const isAttachmentType = await attachment.findOne({
        //     where: { type: attachmentTypeDetails.dataValues.id },
        //     attributes: { exclude: ["deletedAt"] },
        // });
        // if (isAttachmentType) {
        //     return res.status(400).send({
        //         message: "Attachment Type is associated with applications",
        //     });
        // }

        // Delete The Attachment Type Details
        await attachmentTypeDetails.destroy();

        // Success
        res.send({
            message: "Attachment Type deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Attachment Type",
                "Deleted",
                attachmentTypeDetails.name,
                attachmentTypeDetails.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
