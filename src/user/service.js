import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const userService = new DataBaseService(models.users);
// Models
const { users, role } = models;

export const isUserExistsByEmail = async (email, callback) => {
    console.log("email in function---->", email);
    await users
        .findAll({
            attributes: ["id", "email"],
        })
        .then(async (userList) => {
            console.log("user list in function ---->", userList);
            let userEmail = "";
            await userList.forEach((userDetails) => {
                if (
                    userDetails.email.toLowerCase().trim() ===
                    email.toLowerCase().trim()
                ) {
                    userEmail = userDetails.email;
                }
            });
            console.log("user email in function --->", userEmail);
            if (userEmail) {
                return callback(true, userEmail);
            } else {
                return callback(false, "");
            }
        });
};
export const getUserDetailByEmail = async (email) => {
    const userDetails = await user.findOne({
        where: { email: email },
    });
    if (!userDetails) {
        return null;
    }
    return userDetails;
};
export const getUserDetailById = async (id) => {
    const userDetails = await user.findOne({
        where: { id: id },
    });
    if (!userDetails) {
        return null;
    }
    return userDetails;
};
export const isUserExist = async (roll_no, reg_no) => {
    if (!roll_no) {
        return null;
    }
    if (!reg_no) {
        return null;
    }
    const isUserExist = await usersService.findOne({
        where: { roll_no: roll_no, reg_no: reg_no },
    });
    return isUserExist;
};
export default {
    userService,
    isUserExist,
    isUserExistsByEmail,
    getUserDetailByEmail,
    getUserDetailById,
};

export const isSuperAdmin = (req) => {
    const roleId = req.user.id ? req.user.id : "";
    return roleId && roleId === 1 ? true : false;
};
