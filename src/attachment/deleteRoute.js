// import service
import { createActivity } from "../activities/createActivity";
import { attachmentService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Attachment Id is required" });
    }

    try {
        //  Get Attachment Details
        const attachmentDetails = await attachmentService.findOne({
            // attributes: ["id"],
            where: { id },
        });

        // Attachment Not Found
        if (!attachmentDetails) {
            return res.status(400).send({ message: "Attachment not found" });
        }

        // Delete The Attachment Details
        await attachmentDetails.destroy();

        // Success
        res.send({
            message: "Attachment deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Attachment",
                "Deleted",
                response.role_name,
                response.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
