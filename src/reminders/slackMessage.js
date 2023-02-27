const request = require("request");
const axios = require("axios");
export const postMessage = async (messageText) => {
    const slackAccessToken =
        "xoxb-4744090839072-4738139277989-xTNgigX0SydFFTy3x3kn9iNK";
    // const messageText = "";
    const channelId = "D04MCFWPC5V";
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
