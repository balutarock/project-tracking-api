// import service
import { roleService } from "./service";

export default async (req, res, next) => {
    console.log("req body ----->", req.body);

    try {
        // Success
        res.send({
            message: "Role deleted successfully",
        });
    } catch (err) {
        (err) => res.status(400).send({ message: err.message });
    }
};
