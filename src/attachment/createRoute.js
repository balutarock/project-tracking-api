import createActivity from "../activities/createActivity";
import { attachmentService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = attachmentService.toDbObject(data);
        createData.appId = data.appId;
        await attachmentService.create(createData).then((response) => {
            createActivity(
                req,
                "Attachment",
                "Created",
                response.name,
                response.id
            );
        });
        res.status(200).send({ message: "Attachment Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
