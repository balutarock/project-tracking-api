export default (sequelize, DataTypes) => {
    const attachment_type_relation = sequelize.define(
        "attachment_type_relation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_id: DataTypes.INTEGER,
            allowed_role: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return attachment_type_relation;
};
