import { userService } from "./service";
import { getHashPassword } from "../../common/utils";

export default async (req, res, next) => {
    const data = req.body;
    if (data && data.newPassword !== data.confirmPassword) {
        return res.status(400).send({
            message: "New Password & Confirm Password Doesn't Match",
        });
    }
    if (data && data.newPassword && data.confirmPassword) {
        console.log("data new pass ---->", data.newPassword);
        try {
            const value = await userService.findOne({
                where: {
                    email: data.email,
                },
            });
            if (value) {
                await getHashPassword(
                    data.newPassword,
                    async (err, password, hashPassword) => {
                        const updateData = {
                            password: hashPassword,
                        };
                        await userService.update(updateData, {
                            where: { id: value.id },
                        });
                    }
                );
            }
            res.status(200).send({
                value,
                message: "Password Changed Successfully",
            });
        } catch (err) {
            res.status(400).send(err);
            next(err);
        }
    }
};
