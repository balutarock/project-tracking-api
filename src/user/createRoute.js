import { createActivity } from "../activities/createActivity";
import { createUserEmail } from "../userEmail/createUserEmail";
import { inviteUserByEmail } from "./invite";
import { userService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const isEmail = await userService.findOne({
        where: { email: data.email },
    });
    if (isEmail) {
        return res.status(400).send({ message: "Email already exist" });
    }

    const createData = {
        email: data.email,
        role_id: data.role,
        first_name: data.first_name,
    };

    try {
        await userService.create(createData).then((response) => {
            createActivity(req, "User", "Invited", response.email, response.id);
        });

        res.status(200).send({ message: "User Added Successfully" });
        const usersData = {
            email: createData.email,
            name: createData.first_name,
            role: createData.role_id,
        };
        await createUserEmail(req, res, usersData);
        inviteUserByEmail(req, res, createData);
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
