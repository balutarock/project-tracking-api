// import service
import async from "async";
//Common
import { removeUndefinedKeys } from "../../common/utils";
import { saveSetting } from "./service";

export default async (req, res, next) => {
    try {
        const data = req.body;
        const images = {};
        //Validation

        images["portal_logo_image"] =
            data.portal_logo_image && data.portal_logo_image;
        images["portal_favicon_image"] =
            data.portal_favicon_image && data.portal_favicon_image;
        images["portal_login_background_image"] =
            data.portal_login_background_image &&
            data.portal_login_background_image;
        images["portal_left_navigation_background_image"] =
            data.portal_left_navigation_background_image &&
            data.portal_left_navigation_background_image;

        //Remove Media Undefined Keys
        const themeImages = await removeUndefinedKeys(images);
        async
            .eachSeries(Object.keys(data), async (settingKey, cb) => {
                //Save Setting
                await saveSetting(
                    settingKey,
                    data[settingKey],
                    data,
                    themeImages
                );
                return cb();
            })
            .then(() => {
                res.status(200).send({ message: "Setting Saved Successfully" });
            });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
