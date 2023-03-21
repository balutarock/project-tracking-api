// Common
import { formattedDate } from "../../common/date";

// Service
import { applicationService } from "../application/service";
import { customerService } from "../customers/service";
import { serverService } from "../server/service";
import { userService } from "../user/service";

export default async (req, res) => {
    try {
        let applicationData = [];
        let customerData = [];
        let serverData = [];
        let userData = [];
        let applications = [];
        await applicationService.findAndCount().then(async (results) => {
            results.rows.forEach((element) => {
                applicationData.push({
                    id: element.id,
                    name: element.name,
                    createdAt: element.createdAt,
                });
            });
            results.rows
                .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
                .forEach((element) => {
                    applications.push({ id: element.id, name: element.name });
                });
        });
        await customerService.findAndCount().then(async (results) => {
            results.rows.forEach((element) => {
                customerData.push({ id: element.id, name: element.name });
            });
        });
        await serverService.findAndCount().then(async (results) => {
            results.rows.forEach((element) => {
                serverData.push({ id: element.id, name: element.name });
            });
        });
        await userService.findAndCount().then(async (results) => {
            results.rows.forEach((element) => {
                userData.push({ id: element.id, name: element.first_name });
            });
        });

        const data = {
            applicationData: applicationData ? applicationData : "",
            customerData: customerData ? customerData : "",
            serverData: serverData ? serverData : "",
            userData: userData ? userData : "",
            applications: applications ? applications : "",
        };
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
