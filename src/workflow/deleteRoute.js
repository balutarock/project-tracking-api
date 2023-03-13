// import service
import { createActivity } from "../activities/createActivity";
import { workflowService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Workflow Id is required" });
    }

    try {
        //  Get Workflow Details
        const attachmentDetails = await workflowService.findOne({
            // attributes: ["id"],
            where: { id },
        });

        // Workflow Not Found
        if (!attachmentDetails) {
            return res.status(400).send({ message: "Workflow not found" });
        }

        // Delete The Workflow Details
        await attachmentDetails.destroy();

        // Success
        res.send({
            message: "Workflow deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Workflow",
                "Deleted",
                response.role_name,
                response.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
