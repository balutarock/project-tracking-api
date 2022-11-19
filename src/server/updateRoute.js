import { serverService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const serverId = data.serverId;

    if (!serverId) {
        return res.status(400).send({ message: "Server Id is required" });
    }

    try {
        const updateData = serverService.toDbObject(data);
        await serverService.update(updateData, { where: { id: serverId } });
        res.status(200).send({ message: "Server Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
