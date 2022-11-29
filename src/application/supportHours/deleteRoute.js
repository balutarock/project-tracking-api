// import service
import { applicationSupportHoursService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Application Id is required" });
    }

    try {
        //  Get Application Details
        const customerDetails = await applicationSupportHoursService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Application Not Found
        if (!customerDetails) {
            return res.status(400).send({ message: "Application not found" });
        }

        // Delete The Application Details
        await customerDetails.destroy();

        // Success
        res.send({
            message: "Application deleted successfully",
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
