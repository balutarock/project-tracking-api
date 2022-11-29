import { applicationSupportHoursService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const appId = data.appId;
    if (!appId) {
        return res.status(400).send({ message: "Application Id is required" });
    }

    try {
        const updateData = applicationSupportHoursService.toDbObject(data);
        await applicationSupportHoursService.update(updateData, {
            where: { id: appId },
        });
        res.status(200).send({ message: "Application Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
