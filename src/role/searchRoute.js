import { defaultDateFormat } from "../../common/utils";
import { roleService } from "./service";

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
        role_name: "role_name",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "role_name";
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
                role_name: {
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
    roleService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (roleData) => {
                data.push({
                    id: roleData.id,
                    role_name: roleData.role_name,
                    status: roleData.status,
                    create_applications: roleData.create_applications,
                    create_customer: roleData.create_customer,
                    create_server: roleData.create_server,
                    create_user: roleData.create_user,
                    delete_applications: roleData.delete_applications,
                    delete_customer: roleData.delete_customer,
                    delete_server: roleData.delete_server,
                    delete_user: roleData.delete_user,
                    edit_applications: roleData.edit_applications,
                    edit_customer: roleData.edit_customer,
                    edit_server: roleData.edit_server,
                    edit_user: roleData.edit_user,
                    view_applications: roleData.view_applications,
                    view_customer: roleData.view_customer,
                    view_server: roleData.view_server,
                    view_user: roleData.view_user,
                    view_settings: roleData.view_settings,
                    createdAt: defaultDateFormat(roleData.createdAt),
                    updatedAt: defaultDateFormat(roleData.updatedAt),
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
