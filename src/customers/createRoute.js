import { customerService } from "./service";
import { createUserEmail } from "../userEmail/createUserEmail";
import { createActivity } from "../activities/createActivity";

export default async (req, res, next) => {
    const data = req.body;
    const isExist = await customerService.findOne({
        where: { email: data.email },
    });

    if (isExist) {
        return res
            .status(400)
            .send({ message: "Customer Email Already Exists" });
    }
    try {
        const createData = customerService.toDbObject(data).then((response) => {
            createActivity(
                req,
                "Customer",
                "Created",
                response.name,
                response.id
            );
        });
        await customerService.create(createData);
        const customerUsers = {
            email: createData.email,
            name: createData.name,
            role: 0,
        };
        await createUserEmail(req, res, customerUsers);
        res.status(200).send({ message: "Customer Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
