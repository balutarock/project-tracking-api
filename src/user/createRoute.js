import { createActivity } from "../activities/createActivity";
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

    //Get first Name by email
    let first_name;
    if (data.email) {
        first_name = data.email.split("@")[0];
    }

    const createData = {
        email: data.email,
        role_id: data.role,
        first_name: first_name,
    };

    try {
        await userService.create(createData).then((response) => {
            createActivity(req, "User", "Invited", response.email, response.id);
        });

        res.status(200).send({ message: "User Added Successfully" });
        inviteUserByEmail(req, res, createData);
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
