// import service
import { createActivity } from "../activities/createActivity";
import { applicationTypeService } from "./service";
import models from "../../db/models";

const { application } = models;
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
        const applicationTypeDetails = await applicationTypeService.findOne({
            where: { id },
        });

        // Application Type Not Found
        if (!applicationTypeDetails) {
            return res
                .status(400)
                .send({ message: "Application Type not found" });
        }
        const isApplicationExist = await application.findOne({
            where: { type: applicationTypeDetails.dataValues.id },
            attributes: { exclude: ["deletedAt"] },
        });
        if (isApplicationExist) {
            return res.status(400).send({
                message: "Application Type is associated with applications",
            });
        }

        // Delete The Application Type Details
        await applicationTypeDetails.destroy();

        // Success
        res.send({
            message: "Application Type deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Application Type",
                "Deleted",
                applicationTypeDetails.name,
                applicationTypeDetails.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
