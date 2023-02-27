import { reminderService } from "./service";
import { postMessage } from "./slackMessage";
import { createActivity } from "../activities/createActivity";

export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = reminderService.toDbObject(data);
        createData.appId = data.appId;
        await reminderService.create(createData).then((response) => {
            createActivity(
                req,
                "Reminder",
                "Created",
                response.name,
                response.id
            );
        });
        // postMessage("<@U04M6BQ0LEN> Hi gopi");
        res.status(200).send({ message: "Reminder Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
