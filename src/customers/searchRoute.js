import { defaultDateFormat } from "../../common/utils";
import { customerService } from "./service";

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
            .send({ message: `Unable to sort customer by ${sortParam}` });
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
    customerService
        .findAndCount(query)
        .then(async (results) => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async (customerData) => {
                console.log("customerData ------------>", customerData);
                data.push({
                    id: customerData.id,
                    name: customerData.name,
                    email: customerData.email,
                    status: customerData.status,
                    primary_contact_name: customerData.primary_contact_name,
                    primary_contact_email: customerData.primary_contact_email,
                    primary_contact_phone: customerData.primary_contact_phone,
                    secondary_contact_name: customerData.secondary_contact_name,
                    secondary_contact_email:
                        customerData.secondary_contact_email,
                    secondary_contact_phone:
                        customerData.secondary_contact_phone,
                    createdAt: defaultDateFormat(customerData.createdAt),
                    updatedAt: defaultDateFormat(customerData.updatedAt),
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
