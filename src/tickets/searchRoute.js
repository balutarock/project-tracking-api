import { defaultDateFormat } from "../../common/utils";
import { ticketService } from "./service";
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
        summary: "summary",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "summary";
    // Validate sortable fields is present in sort param
    if (!Object.keys(sortableFields).includes(sortParam)) {
        return res
            .status(400)
            .send({ message: `Unable to sort ticket by ${sortParam}` });
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
                summary: {
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
    ticketService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (ticketData) => {
                data.push({
                    id: ticketData.id,
                    summary: ticketData.summary,
                    created_by: ticketData && ticketData.userData,
                    createdAt: defaultDateFormat(ticketData.createdAt),
                    updatedAt: defaultDateFormat(ticketData.updatedAt),
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
