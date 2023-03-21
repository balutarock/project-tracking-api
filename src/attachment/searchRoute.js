import { defaultDateFormat } from "../../common/utils";
import { attachmentService, getAttachmentTypeRelation } from "./service";
import models from "../../db/models";

const { attachment_type, users } = models;
export default async (req, res, next) => {
    let { page, pageSize, search, sort, sortDir, pagination } = req.query;
    // Validate if page is not a number
    page = page ? parseInt(page, 10) : 1;
    if (isNaN(page)) {
        return res.status(400).send({ message: "Invalid page" });
    }

    // Validate if page size is not a number
    pageSize = pageSize ? parseInt(pageSize, 10) : 10;
    if (isNaN(pageSize)) {
        return res.status(400).send({ message: "Invalid page size" });
    }

    const validOrder = ["ASC", "DESC"];
    const sortableFields = {
        name: "name",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "name";
    // Validate sortable fields is present in sort param
    if (!Object.keys(sortableFields).includes(sortParam)) {
        return res
            .status(400)
            .send({ message: `Unable to sort attachment by ${sortParam}` });
    }

    const sortDirParam = sortDir ? sortDir.toUpperCase() : "ASC";
    // Validate order is present in sortDir param
    if (!validOrder.includes(sortDirParam)) {
        return res.status(400).send({ message: "Invalid sort order" });
    }

    const where = {};
    // Search by term
    const searchTerm = search ? search.trim() : null;
    if (searchTerm) {
        where.$or = [
            {
                name: {
                    $ilike: `%${searchTerm}%`,
                },
            },
        ];
    }

    // Get type relation for permissions
    const attachmentTypeRelation = await getAttachmentTypeRelation(
        req.user.role_id
    );

    where.appId = req.params.appId;
    const query = {
        order: [[sortParam, sortDirParam]],
        where,
        attributes: { exclude: ["deletedAt"] },
        include: [
            {
                model: attachment_type,
                as: "attachmentTypeData",
            },
            {
                model: users,
                as: "userData",
            },
        ],
    };

    if (pagination) {
        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }
    // Get list and count
    attachmentService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (attachmentData) => {
                if (attachmentData) {
                    if (attachmentTypeRelation.includes(attachmentData.type))
                        data.push({
                            id: attachmentData.id,
                            appId: attachmentData.appId,
                            name: attachmentData.name,
                            status: attachmentData.status,
                            assignee: attachmentData.assignee,
                            assigneeName:
                                attachmentData && attachmentData.userData
                                    ? `${
                                          attachmentData &&
                                          attachmentData.userData &&
                                          attachmentData.userData.first_name
                                      } ${
                                          attachmentData &&
                                          attachmentData.userData &&
                                          attachmentData.userData.last_name
                                      }`
                                    : "Unassigned",
                            typeId: attachmentData.attachmentTypeData.id,
                            type: attachmentData.attachmentTypeData.name,
                            link: attachmentData.link,
                            createdAt: defaultDateFormat(
                                attachmentData.createdAt
                            ),
                            updatedAt: defaultDateFormat(
                                attachmentData.updatedAt
                            ),
                        });
                }
            });
            res.send({
                totalCount: results.count,
                currentPage: page,
                pageSize,
                data,
            });
        })
        .catch((err) => {
            next(err);
        });
};
