import { createUserEmail } from "../userEmail/createUserEmail";
import { customerService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const customerId = data.customerId;

    if (!customerId) {
        return res.status(400).send({ message: "Customer Id is required" });
    }

    try {
        const updateData = customerService.toDbObject(data);
        await customerService.update(updateData, { where: { id: customerId } });

        console.log("data ----->", data);
        const customerData = {
            email: data.email && data.email,
            name: data.name && data.name,
            role: 0,
        };
        await createUserEmail(req, res, customerData);
        const primaryData = {
            email: data.primary_contact_email && data.primary_contact_email,
            name: data.primary_contact_name && data.primary_contact_name,
            role: 0,
        };
        await createUserEmail(req, res, primaryData);
        const secondaryData = {
            email: data.secondary_contact_email && data.secondary_contact_email,
            name: data.secondary_contact_name && data.secondary_contact_name,
            role: 0,
        };
        await createUserEmail(req, res, secondaryData);
        res.status(200).send({ message: "Customer Updated Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
