// import service
import { createActivity } from "../activities/createActivity";
import { roleService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Role Id is required" });
    }

    try {
        //  Get Role Details
        const roleDetails = await roleService.findOne({
            // attributes: ["id"],
            where: { id },
        });

        // Role Not Found
        if (!roleDetails) {
            return res.status(400).send({ message: "Role not found" });
        }

        // Delete The Role Details
        await roleDetails.destroy();

        // Success
        res.send({
            message: "Role deleted successfully",
        });
        res.on("finish", async () => {
            createActivity(
                req,
                "Role",
                "Deleted",
                response.role_name,
                response.id
            );
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
