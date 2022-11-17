import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";
import { MEDIA_PATH_SETTING } from "../../common/s3FilePath";
import slug from "slug";
import async from "async";
//Common
import { uploadBase64File } from "../../common/s3";

export const settingService = new DataBaseService(models.setting);

//Get Setting Value
export const getSettingValue = async (name) => {
    try {
        if (!name) {
            return null;
        }
        const settingDetails = await settingService.findOne({
            attributes: ["value"],
            where: { name },
        });
        return settingDetails && settingDetails.value
            ? settingDetails.value
            : "";
    } catch (err) {
        console.log(err);
    }
};

//Get Setting Value
export const getSystemSettingValue = async (name) => {
    try {
        if (!name) {
            return null;
        }
        const settingDetails = await settingService.findOne({
            attributes: ["value"],
            where: { name },
        });
        return settingDetails && settingDetails.value
            ? settingDetails.value
            : "";
    } catch (err) {
        console.log(err);
    }
};

//Get ExtenstionByType
export const getMediaExtensionByType = async (fileType) => {
    switch (fileType) {
        case "image/png":
            return "png";
        case "image/jpeg":
        case "image/jpg":
            return "jpg";
        case "image/gif":
            return "gif";
        case "image/bmp":
            return "bmp";
        default:
            return "";
    }
};

//Save Common Setting
export const saveSetting = async (name, value, data, images) => {
    try {
        const settingData = {
            name: name,
            value: value,
        };
        if (
            !name ||
            (name === "portal_logo_image" && data.portal_logo_url) ||
            (name === "portal_favicon_image" && data.portal_favicon_url) ||
            (name === "portal_login_background_image" &&
                data.portal_login_background_image_url) ||
            (name === "portal_left_navigation_background_image" &&
                data.portal_left_navigation_background_image_url)
        ) {
            if (images) {
                async.eachSeries(
                    Object.keys(images),
                    async (settingKey, cb) => {
                        //Save Image
                        await saveImage(settingKey, images[settingKey]);
                        return cb();
                    }
                );
            }
        }
        const isSettingExist = await settingService.findOne({
            where: { name: name },
        });
        if (isSettingExist) {
            await settingService.update(settingData, {
                where: { name: name },
            });
        } else {
            await settingService.create(settingData);
        }
        return true;
    } catch (err) {
        console.log(err);
    }
};

//Save Image
export const saveImage = async (name, image) => {
    let mediaName;
    try {
        if (!name && !image) {
            return false;
        }

        //Get Extention Type
        const imageType = await getMediaExtensionByType(image && image.type);

        const where = { name: name };
        await settingService
            .findOne({
                attributes: ["id"],
                where,
            })
            .then(async (settingDetails) => {
                const timeStamp = Math.floor(Date.now());
                if (settingDetails) {
                    mediaName = `${slug(`${name}-${timeStamp}`, {
                        lower: true,
                    })}.${imageType}`;
                    const updateData = {
                        name: name,
                        value: mediaName,
                    };
                    //Upload Image
                    await uploadImage(image, mediaName, settingDetails);

                    settingService.update(updateData, {
                        where: { id: settingDetails.id },
                    });
                } else
                    return settingService
                        .create({ name: name, value: mediaName })
                        .then(async (settingDetails) => {
                            const mediaName = `${slug(`${name}-${timeStamp}`, {
                                lower: true,
                            })}.${imageType}`;
                            //Upload Image
                            await uploadImage(image, mediaName, settingDetails);
                        });
            });
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const uploadImage = (image, mediaName, settingDetails, callback) => {
    try {
        if (!image) return callback(null);
        const mediaPath = `${MEDIA_PATH_SETTING}/${mediaName}`;

        uploadBase64File(
            image,
            mediaPath,
            async (err) => {
                if (err) {
                    throw err;
                }
            },
            { public: true }
        );
    } catch (err) {
        console.log(err);
    }
};

export default { settingService, getSettingValue };
