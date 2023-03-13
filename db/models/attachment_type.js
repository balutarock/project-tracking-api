export default (sequelize, DataTypes) => {
    const attachment_type = sequelize.define(
        "attachment_type",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            allowed_roles: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return attachment_type;
};
