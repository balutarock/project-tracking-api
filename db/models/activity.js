export default (sequelize, DataTypes) => {
    const activity = sequelize.define(
        "activity",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            notes: DataTypes.TEXT,
            reference_id: DataTypes.INTEGER,
            createdBy: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    activity.associate = function (models) {
        activity.belongsTo(models.users, {
            as: "userData",
            foreignKey: "createdBy",
        });
    };

    return activity;
};
