import { defaultDateFormat } from "../../common/utils";
import { activityService } from "./service";
import models from "../../db/models";

const { users } = models;

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

    const sortParam = sort || "createdAt";
    // Validate sortable fields is present in sort param
    if (!Object.keys(sortableFields).includes(sortParam)) {
        return res
            .status(400)
            .send({ message: `Unable to sort role by ${sortParam}` });
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

    const query = {
        order: [[sortParam, sortDirParam]],
        where,
        attributes: { exclude: ["deletedAt"] },
        include: [
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
    activityService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (activityData) => {
                data.push({
                    id: activityData.id,
                    name: activityData.name,
                    ref_id: activityData.reference_id,
                    user:
                        activityData &&
                        activityData.userData &&
                        activityData.userData.first_name,
                    notes: activityData.notes,
                    createdAt: defaultDateFormat(activityData.createdAt),
                    updatedAt: defaultDateFormat(activityData.updatedAt),
                });
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
