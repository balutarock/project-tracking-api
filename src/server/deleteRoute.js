// import service
import { serverService } from "./service";
import models from "../../db/models";

const { application } = models;
export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Server Id is required" });
    }

    try {
        //  Get Server Details
        const serverDetails = await serverService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Server Not Found
        if (!serverDetails) {
            return res.status(400).send({ message: "Server not found" });
        }
        const isApplicationExist = await application.findOne({
            where: { customer: serverDetails.dataValues.id },
            attributes: { exclude: ["deletedAt"] },
        });
        if (isApplicationExist) {
            return res.status(400).send({
                message: "Server is associated with applications",
            });
        }

        // Delete The Server Details
        await serverDetails.destroy();

        // Success
        res.send({
            message: "Server deleted successfully",
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
