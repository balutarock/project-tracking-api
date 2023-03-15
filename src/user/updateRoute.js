import { getMediaExtensionByType, uploadImage } from "../settings/service";
import { userService } from "./service";
import slug from "slug";

export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;

    if (!id) {
        return res.status(400).send({ message: "User Id is required" });
    }

    try {
        if (data && data.avatar) {
            let mediaName;
            //Get Extention Type
            const imageType = await getMediaExtensionByType(
                data.avatar && data.avatar.type
            );
            const timeStamp = Math.floor(Date.now());
            mediaName = `${slug(`${req.user.id}-${timeStamp}`, {
                lower: true,
            })}.${imageType}`;
            const updateData = {
                avatar: mediaName,
            };
            await uploadImage(data.avatar, mediaName);
            await userService.update(updateData, { where: { id: id } });
            res.status(200).send({
                message: "User Avatar Updated Successfully",
            });
        } else {
            const updateData = userService.toDbObject(data);
            await userService.update(updateData, { where: { id: id } });
            res.status(200).send({ message: "User Updated Successfully" });
        }
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
