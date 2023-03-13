// import service
import { customerService } from "./service";
import models from "../../db/models";

const { application } = models;
export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Customer Id is required" });
    }

    try {
        //  Get Customer Details
        const customerDetails = await customerService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Customer Not Found
        if (!customerDetails) {
            return res.status(400).send({ message: "Customer not found" });
        }
        const isApplicationExist = await application.findOne({
            where: { customer: customerDetails.dataValues.id },
            attributes: { exclude: ["deletedAt"] },
        });
        if (isApplicationExist) {
            return res.status(400).send({
                message: "Customer is associated with applications",
            });
        }

        // Delete The Customer Details
        await customerDetails.destroy();

        // Success
        res.send({
            message: "Customer deleted successfully",
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
