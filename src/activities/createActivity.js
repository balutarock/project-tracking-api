import { activityService } from "./service";

export const createActivity = async (req, activity, type, name, ref_id) => {
    try {
        const createData = {
            createdBy: req.user.id,
            name: `${type} ${activity} - ${name}`,
            reference_id: ref_id,
        };
        await activityService.create(createData);
    } catch (error) {
        console.log("error in creating activity ->", error);
        return error;
    }
};

export default {
    createActivity,
};
