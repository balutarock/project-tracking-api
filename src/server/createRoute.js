import { createActivity } from "../activities/createActivity";
import { serverService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    let isExist = false;
    if (data) {
        const value = await serverService.findAndCount();
        let serverList = [];

        value.rows.forEach((element) => {
            if (element.name) {
                serverList.push(element.name.toLowerCase().trim());
                isExist = serverList.includes(data.name.toLowerCase().trim());
            }
        });
    }

    if (isExist) {
        return res.status(400).send({ message: "Server Already Exists" });
    }
    try {
        const createData = serverService.toDbObject(data);
        await serverService.create(createData).then((response) => {
            createActivity(
                req,
                "Server",
                "Created",
                response.name,
                response.id
            );
        });
        res.status(200).send({ message: "Server Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
