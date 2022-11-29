import { applicationProductService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    let isExist = false;
    if (data) {
        const value = await applicationProductService.findAndCount();
        let applicationList = [];

        value.rows.forEach((element) => {
            if (element.role_name) {
                applicationList.push(element.role_name.toLowerCase().trim());
                isExist = applicationList.includes(
                    data.role_name.toLowerCase().trim()
                );
            }
        });
    }

    if (isExist) {
        return res
            .status(400)
            .send({ message: "Application Name Already Exists" });
    }
    try {
        const createData = applicationProductService.toDbObject(data);
        await applicationProductService.create(createData);
        res.status(200).send({ message: "Application Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
