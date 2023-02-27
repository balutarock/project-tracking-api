import { userService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;

    if (!id) {
        return res.status(400).send({ message: "User Id is required" });
    }

    try {
        const updateData = userService.toDbObject(data);
        await userService.update(updateData, { where: { id: id } });
        res.status(200).send({ message: "User Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
