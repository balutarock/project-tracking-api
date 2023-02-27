import { defaultDateFormat } from "../../common/utils";
import { applicationTypeService } from "./service";

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
        return res.status(400).send({
            message: `Unable to sort application type by ${sortParam}`,
        });
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
    };

    if (pagination) {
        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }
    // Get list and count
    applicationTypeService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (applicationTypeData) => {
                data.push({
                    id: applicationTypeData.id,
                    name: applicationTypeData.name,
                    status: applicationTypeData.status,
                    show_application_name:
                        applicationTypeData.show_application_name,
                    show_application_type:
                        applicationTypeData.show_application_type,
                    show_application_url:
                        applicationTypeData.show_application_url,
                    show_customer: applicationTypeData.show_customer,
                    show_due_at: applicationTypeData.show_due_at,
                    show_git_url: applicationTypeData.show_git_url,
                    show_port_number: applicationTypeData.show_port_number,
                    show_remaining_hours:
                        applicationTypeData.show_remaining_hours,
                    show_server: applicationTypeData.show_server,
                    show_spent_hours: applicationTypeData.show_spent_hours,
                    show_started_at: applicationTypeData.show_started_at,
                    show_status: applicationTypeData.show_status,
                    show_total_hours: applicationTypeData.show_total_hours,
                    createdAt: defaultDateFormat(applicationTypeData.createdAt),
                    updatedAt: defaultDateFormat(applicationTypeData.updatedAt),
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
