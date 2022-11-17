import async from "async";
import { settingService } from "./service";

async function saveSystemSetting(name, value, req, callback) {
    try {
        const settingData = {
            name: name,
            value: value,
            updated_by: req.user.id,
        };

        const isSettingExist = await settingService.findOne({
            where: { name: name },
        });
        if (isSettingExist) {
            await settingService.update(settingData, {
                where: { name: name },
            });
        } else {
            (settingData.created_by = req.user.id),
                await settingService.create(settingData);
        }
        return callback();
    } catch (err) {
        console.log(err);
    }
}

export default async (req, res, next) => {
    try {
        const data = req.body;
        async
            .eachSeries(
                Object.keys(data),
                async (settingKey, cb) =>
                    await saveSystemSetting(
                        settingKey,
                        data[settingKey],
                        req,
                        cb
                    )
            )
            .then(() => {
                res.status(200).send({ message: "Setting Saved Successfully" });
            });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
