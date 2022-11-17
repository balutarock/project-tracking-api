export default (sequelize, DataTypes) => {
    const customer = sequelize.define(
        "customer",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return customer;
};
