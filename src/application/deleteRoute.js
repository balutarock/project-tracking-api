// import service
import { applicationService } from "./service";
import models from "../../db/models";

const { reminder, attachment } = models;
export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Application Id is required" });
    }

    try {
        //  Get Application Details
        const applicationDetails = await applicationService.findOne({
            where: { id },
        });
        // Application Not Found
        if (!applicationDetails) {
            return res.status(400).send({ message: "Application not found" });
        }

        // Delete The Application Details
        await applicationDetails.destroy();

        // Success
        res.send({
            message: "Application deleted successfully",
        });

        res.on("finish", async () => {
            const reminderDetails = await reminder.findAll({
                where: { appId: applicationDetails.dataValues.id },
            });
            reminderDetails.forEach(async (element) => {
                await element.destroy();
            });
            const attachmentDetails = await attachment.findAll({
                where: { appId: applicationDetails.dataValues.id },
            });
            attachmentDetails.forEach(async (element) => {
                await element.destroy();
            });
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
