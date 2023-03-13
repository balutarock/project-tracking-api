import { createActivity } from "../activities/createActivity";
import { workflowService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = workflowService.toDbObject(data);
        await workflowService.create(createData).then((response) => {
            createActivity(
                req,
                "Workflow",
                "Created",
                response.name,
                response.id
            );
        });
        res.status(200).send({ message: "Workflow Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
