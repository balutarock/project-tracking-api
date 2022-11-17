import AWS from "aws-sdk";
const path = require("path");
require("dotenv").config({ silent: true });

import { MEDIA_PATH_SETTING } from "./s3FilePath";

//Service
import { getSystemSettingValue } from "../src/settings/service";

// Constants
import * as awsConstant from "./constants";

const getS3Config = async () => {
    try {
        const accessKeyId = await getSystemSettingValue(awsConstant.AWS_KEY_ID);
        const secretAccessKey = await getSystemSettingValue(
            awsConstant.AWS_SECRET_KEY
        );

        /**
         * Update AWS config
         */
        await AWS.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        });

        const s3 = new AWS.S3();
        return s3;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get File URL
 *
 * @param {*} filePath
 * @param {*} callback
 */
export async function getS3ObjectUrl(filePath) {
    try {
        const mediaBaseUrl = await getSystemSettingValue(
            awsConstant.AWS_MEDIA_BASE_URL
        );

        return `${mediaBaseUrl}/${MEDIA_PATH_SETTING}/${filePath}`;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Upload Base64 To File
 *
 * @param base64
 * @param newPath
 * @param callback
 */
export async function uploadBase64File(base64, newPath, callback, options) {
    try {
        const s3 = await getS3Config();

        const buffer = Buffer.from(
            base64.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const bucketName = await getSystemSettingValue(
            awsConstant.AWS_BUCKET_NAME
        );

        const params = {
            Bucket: bucketName,
            Key: newPath,
            Body: buffer,
            ContentEncoding: "base64",
            ContentType: "image/png",
        };

        if (options && typeof options === "object" && options.public)
            params.ACL = "public-read";

        const extension = path.extname(newPath);
        params.Key = `${path.dirname(newPath)}/${path.basename(
            newPath,
            extension
        )}${extension}`;

        s3.putObject(params, (err) => {
            if (err) {
                return callback(err);
            }

            return callback();
        });
    } catch (error) {
        console.log(error);
    }
}
