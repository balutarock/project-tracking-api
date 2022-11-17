export default async (req, res) => {
    console.log("req ----->", req.params);
    try {
    } catch (error) {
        return res.status(401).send({ message: "Invalid Token" });
    }
};
