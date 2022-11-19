export default async (req, res) => {
    try {
    } catch (error) {
        return res.status(401).send({ message: "Invalid Token" });
    }
};
