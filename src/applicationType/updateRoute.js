import { applicationTypeService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;
    if (!id) {
        return res
            .status(400)
            .send({ message: "Application Type Id is required" });
    }

    try {
        const updateData = applicationTypeService.toDbObject(data);
        await applicationTypeService.update(updateData, {
            where: { id: id },
        });
        res.status(200).send({
            message: "Application Type Updated Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
