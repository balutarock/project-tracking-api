export default (sequelize, DataTypes) => {
    const application_products = sequelize.define(
        "application_products",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            customer: DataTypes.STRING,
            type: DataTypes.STRING,
            started_at: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return application_products;
};
