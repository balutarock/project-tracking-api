import { userService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    if (data && data.email) {
        const isUserExist = await userService.findOne({
            where: { email: data.email },
        });
        if (!isUserExist) {
            return res
                .status(400)
                .send({ message: "Please enter registered email" });
        }
        if (isUserExist && isUserExist.status == "invited") {
            return res
                .status(400)
                .send({ message: "Please enter registered email" });
        }
        try {
            const value = await userService.findOne({
                where: {
                    email: data.email,
                },
            });
            res.status(200).send({ value, message: "User Found Successfully" });
        } catch (err) {
            res.status(400).send(err);
            next(err);
        }
    }
};
