//Common
import { getHashPassword, removeUndefinedKeys } from "../../common/utils";

//Service
import { userService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    try {
        const updateData = {
            first_name: data.first_name,
            last_name: data.last_name,
        };
        getHashPassword(data.password, (err, password, hashPassword) => {
            if (hashPassword) {
                updateData["password"] = hashPassword;
            }
            userService
                .update(removeUndefinedKeys(updateData), {
                    where: { email: data.email },
                })
                .then(() => {
                    res.status(200).send({
                        message: "You have Signed Up Successfully",
                    });
                });
        });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
