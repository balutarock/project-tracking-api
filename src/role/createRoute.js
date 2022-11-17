import { createActivity } from "../activities/createActivity";
import { roleService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const isExist = await roleService.findOne({
        where: { role_name: data.role_name },
    });

    if (isExist) {
        return res.status(400).send({ message: "Role Name Already Exists" });
    }
    try {
        const createData = roleService.toDbObject(data);
        await roleService.create(createData).then((response) => {
            createActivity(
                req,
                "Role",
                "Created",
                response.role_name,
                response.id
            );
        });
        res.status(200).send({ message: "Role Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
