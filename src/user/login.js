//Service
import { isUserExistsByEmail, userService } from "../user/service";

// Common
import { hasher, getSQlCurrentDateTime } from "../../common/utils";
import { BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED } from "../../common/status";
import { isEmail } from "../../common/validator";

/**
 * After Login Success
 *
 * @param user
 * @param callback
 */
async function afterLoginSuccess(user, callback) {
    const { id, email, role_id, first_name, last_name, token } = user.get();
    const session_id = token || Math.floor(Date.now());
    const updateData = {
        last_loggedin_at: getSQlCurrentDateTime(),
        token: session_id,
    };
    userService
        .update(updateData, {
            where: { id: id },
        })
        .then(() => {
            callback(null, OK, {
                message: "User LoggedIn SuccessFully",
                token: session_id,
                userId: id,
                role: role_id,
                firstName: first_name,
                lastName: last_name,
                email,
            });
        })
        .catch((err) => callback(err));
}

/**
 * Login By Password
 *
 * @param email
 * @param password
 * @param callback
 * @returns {*}
 */
async function loginByPassword(email, password, callback) {
    console.log("email ---->", email);
    console.log("password ---->", password);

    // Validate if email is null
    if (!email) {
        return callback(new Error("Email is required"));
    }

    email = email.toLowerCase().trim();

    // Validate if email is invalid
    if (!isEmail(email)) {
        return callback(new Error("Invalid email"));
    }

    // Validate if password is null
    if (!password) {
        return callback(new Error("Password is required"));
    }

    await isUserExistsByEmail(email, (isExists, userEmail) => {
        console.log("email ----->", email);
        console.log("isExists ----->", isExists);
        console.log("userEmail ----->", userEmail);
        // Validate if user is not registered yet
        if (isExists != true) {
            return callback(new Error("Invalid email or password"), NOT_FOUND);
        }

        userService
            .findOne({
                attributes: [
                    "id",
                    "first_name",
                    "last_name",
                    "email",
                    "role_id",
                    "password",
                ],
                where: { email: userEmail },
            })
            .then(async (userDetails) => {
                console.log("user details ---->", userDetails);
                // Validate if user is not registered yet
                if (!userDetails) {
                    return callback(
                        new Error("Invalid email or password"),
                        NOT_FOUND
                    );
                }
                if (!hasher(password, userDetails.get().password)) {
                    // Validate if user password is not matching
                    return callback(
                        new Error("Invalid email or password"),
                        UNAUTHORIZED
                    );
                }
                return afterLoginSuccess(userDetails, callback);
            });
    });
    // }
}
export default async (req, res) => {
    const { email, password } = req.body;

    return loginByPassword(email, password, (err, status, result) => {
        if (err) {
            return res
                .status(status || BAD_REQUEST)
                .send({ message: err.message });
        }
        return res.json(result);
    });
};
