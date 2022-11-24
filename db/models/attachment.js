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
            type: DataTypes.STRING,
            link: DataTypes.STRING,
            appId: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return attachment;
};
