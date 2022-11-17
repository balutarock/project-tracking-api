// import service
import { userService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "User Id is required" });
    }

    try {
        //  Get User Details
        const userDetails = await userService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // User Not Found
        if (!userDetails) {
            return res.status(400).send({ message: "User not found" });
        }

        // Delete The User Details
        await userDetails.destroy();

        // Success
        res.send({
            message: "User deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
