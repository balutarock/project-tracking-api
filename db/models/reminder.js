export default (sequelize, DataTypes) => {
    const reminder = sequelize.define(
        "reminder",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            subject: DataTypes.STRING,
            description: DataTypes.TEXT,
            remind_at: DataTypes.STRING,
            cc_email: DataTypes.STRING,
            to_email: DataTypes.STRING,
            appId: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return reminder;
};
