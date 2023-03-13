import { SLACK_BOT_ACCESS_TOKEN, SLACK_CHANNEL_ID } from "../settings/Constant";
import { getSystemSettingValue } from "../settings/service";

const request = require("request");
const axios = require("axios");
export const postMessage = async (messageText) => {
    const slackAccessToken = await getSystemSettingValue(
        SLACK_BOT_ACCESS_TOKEN
    );
    const channelId = await getSystemSettingValue(SLACK_CHANNEL_ID);

    try {
        const data = JSON.stringify({
            channel: channelId,
            text: messageText,
        });
        const option = {
            url: "https://slack.com/api/chat.postMessage",
            method: "POST",
            json: true,
            headers: {
                Authorization: `Bearer ${slackAccessToken} `,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(option)
            .then(function (response) {
                console.log(
                    "JSON.stringify(response.data)",
                    JSON.stringify(response.data)
                );
            })
            .catch(function (error) {});
    } catch (error) {
        console.log("error in send slack message", error);
    }
};
