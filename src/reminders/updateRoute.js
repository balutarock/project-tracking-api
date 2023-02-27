import { reminderService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const appId = data.appId;
    if (!appId) {
        return res.status(400).send({ message: "Reminder Id is required" });
    }

    try {
        const updateData = reminderService.toDbObject(data);
        await reminderService.update(updateData, {
            where: { id: appId },
        });
        res.status(200).send({ message: "Reminder Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
