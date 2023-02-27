import models from "../../db/models";
const { user_email } = models;

export const createUserEmail = async (req, res, data) => {
    const isExist = await user_email.findOne({
        where: { email: data.email },
    });

    try {
        if (!isExist) {
            const userData = {
                email: data.email,
                name: data.name,
                role: data.role ? data.role : 0,
            };
            await user_email.create(userData);
        } else if (isExist) {
            const userData = {
                email: data.email,
                name: data.name,
                role: data.role ? data.role : 0,
            };
            await user_email.update(userData, {
                where: { email: data.email },
            });
        }
    } catch (err) {
        return err;
    }
};
