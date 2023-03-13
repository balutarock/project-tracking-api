import { createActivity } from "../activities/createActivity";
import {
    attachmentTypeService,
    attachmentTypeRelationService,
} from "./service";
import models from "../../db/models";

const { attachment_type_relation } = models;
export default async (req, res, next) => {
    const data = req.body;
    try {
        const createData = attachmentTypeService.toDbObject(data);
        createData.appId = data.appId;
        await attachmentTypeService.create(createData).then((response) => {
            createAttachmentTypeRelation(req, response);
            createActivity(
                req,
                "Attachment Type",
                "Created",
                response.name,
                response.id
            );
        });

        res.status(200).send({
            message: "Attachment Type Created Successfully",
        });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};

export const createAttachmentTypeRelation = async (req, data) => {
    const attachmentTypeDetails = await attachment_type_relation.findAll({
        where: { type_id: data && data.id },
    });

    if (attachmentTypeDetails) {
        attachmentTypeDetails.forEach((el) => {
            el.destroy();
        });
    }
    const allowedRoles = data && data.allowed_roles.split(",");
    allowedRoles &&
        allowedRoles.forEach(async (element) => {
            const createData = {
                type_id: data.id,
                allowed_role: parseInt(element),
            };
            await attachmentTypeRelationService.create(createData);
        });
};
