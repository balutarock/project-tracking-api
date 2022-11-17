import { roleService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const roleId = data.id;
    if (!roleId) {
        return res.status(400).send({ message: "Role Id is required" });
    }

    try {
        const updateData = roleService.toDbObject(data);
        await roleService.update(updateData, { where: { id: roleId } });
        res.status(200).send({ message: "Role Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
