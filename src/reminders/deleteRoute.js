// import service
import { createActivity } from "../activities/createActivity";
import { reminderService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Reminder Id is required" });
    }

    try {
        //  Get Reminder Details
        const reminderDetails = await reminderService.findOne({
            // attributes: ["id"],
            where: { id },
        });

        // Reminder Not Found
        if (!reminderDetails) {
            return res.status(400).send({ message: "Reminder not found" });
        }

        // Delete The Reminder Details
        await reminderDetails.destroy();

        // Success
        res.send({
            message: "Reminder deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Reminder",
                "Deleted",
                response.role_name,
                response.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
