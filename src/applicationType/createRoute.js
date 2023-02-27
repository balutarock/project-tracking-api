import { createActivity } from "../activities/createActivity";
import { applicationTypeService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = applicationTypeService.toDbObject(data);
        createData.appId = data.appId;
        await applicationTypeService.create(createData).then((response) => {
            createActivity(
                req,
                "Application Type",
                "Created",
                response.name,
                response.id
            );
        });
        res.status(200).send({
            message: "Application Type Created Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
