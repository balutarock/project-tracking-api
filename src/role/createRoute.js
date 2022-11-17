import { createActivity } from "../activities/createActivity";
import { userService } from "../user/service";
import { roleService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    let isExist = false;
    if (data) {
        const value = await roleService.findAndCount();
        let roleList = [];

        value.rows.forEach((element) => {
            if (element.role_name) {
                roleList.push(element.role_name.toLowerCase().trim());
                isExist = roleList.includes(
                    data.role_name.toLowerCase().trim()
                );
            }
        });
    }

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
