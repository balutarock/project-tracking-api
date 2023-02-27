// import service
import { createActivity } from "../activities/createActivity";
import { applicationTypeService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res
            .status(400)
            .send({ message: "Application Type Id is required" });
    }

    try {
        //  Get Application Type Details
        const reminderDetails = await applicationTypeService.findOne({
            // attributes: ["id"],
            where: { id },
        });

        // Application Type Not Found
        if (!reminderDetails) {
            return res
                .status(400)
                .send({ message: "Application Type not found" });
        }

        // Delete The Application Type Details
        await reminderDetails.destroy();

        // Success
        res.send({
            message: "Application Type deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Application Type",
                "Deleted",
                reminderDetails.name,
                reminderDetails.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
