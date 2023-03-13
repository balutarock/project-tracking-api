import { attachmentService } from "./service";
// Models
import models from "../../db/models";
import { sendAttachmentUpdateNotification } from "./notification";

// Models
const { workflow } = models;
export default async (req, res, next) => {
    const data = req.body;
    const id = data.id;
    if (!id) {
        return res.status(400).send({ message: "Attachment Id is required" });
    }

    try {
        const updateData = attachmentService.toDbObject(data);
        await attachmentService.update(updateData, {
            where: { id: id },
        });
        res.status(200).send({ message: "Attachment Updated Successfully" });
        if (data && data.status) {
            let workFlows = [];
            const workFlowDetails = await workflow.findAll({
                where: { workflow_for: "attachment" },
                attributes: { exclude: ["deletedAt"] },
            });
            workFlowDetails.map((value) => {
                if (
                    value &&
                    value.dataValues &&
                    value.dataValues.status == "enabled"
                ) {
                    workFlows.push(value.dataValues);
                }
            });

            sendAttachmentUpdateNotification(req, workFlows, data);
        }
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
