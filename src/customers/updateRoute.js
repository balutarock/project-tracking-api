import { customerService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const customerId = data.customerId;

    if (!customerId) {
        return res.status(400).send({ message: "Customer Id is required" });
    }

    try {
        const updateData = customerService.toDbObject(data);
        await customerService.update(updateData, { where: { id: customerId } });
        res.status(200).send({ message: "Customer Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
