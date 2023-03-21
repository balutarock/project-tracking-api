import { appFrontendUrl } from "../../config";
import { postMessage } from "../reminders/slackMessage";
import { getUserSlackIdsById, userService } from "../user/service";

export const sendAttachmentStatusUpdateNotification = async (
    req,
    workflow,
    data
) => {
    const statusName =
        data && data.status == "pending"
            ? "Pending"
            : data && data.status == "inReview"
            ? "In-Review"
            : data && data.status == "reviewed"
            ? "Reviewed"
            : data && data.status == "sentToCustomer"
            ? "Sent to Customer"
            : "";

    const reqUser = await getUserSlackIdsById(req.user.id);
    const message = `<!channel> <@${reqUser.slackId}> updated the attachment status to "${data.name}" for the application "${data.appName}"  to ${statusName}. \n ${appFrontendUrl}/applications/details/${data.appId}`;
    postMessage(message);
};

export const sendAttachmentAssigneeUpdateNotification = async (req, data) => {
    const assignee = await userService.findOne({
        where: { id: data.assignee },
    });

    const reqUser = await getUserSlackIdsById(req.user.id);
    const message = `<!channel> <@${reqUser.slackId}> assigned "${data.name}" attachment to <@${assignee.slack_id}> for the application "${data.appName}". \n ${appFrontendUrl}/applications/details/${data.appId}`;
    postMessage(message);
};
