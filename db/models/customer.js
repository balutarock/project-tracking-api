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
            primary_contact_name: DataTypes.STRING,
            primary_contact_email: DataTypes.STRING,
            primary_contact_phone: DataTypes.STRING,
            secondary_contact_name: DataTypes.STRING,
            secondary_contact_email: DataTypes.STRING,
            secondary_contact_phone: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return customer;
};
