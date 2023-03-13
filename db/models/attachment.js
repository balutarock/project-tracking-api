export default (sequelize, DataTypes) => {
    const attachment = sequelize.define(
        "attachment",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            type: DataTypes.INTEGER,
            status: DataTypes.STRING,
            link: DataTypes.STRING,
            appId: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    attachment.associate = function (models) {
        attachment.belongsTo(models.attachment_type, {
            as: "attachmentTypeData",
            foreignKey: "type",
        });
    };

    return attachment;
};
