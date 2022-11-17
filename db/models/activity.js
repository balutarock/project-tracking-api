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
            reference_id: DataTypes.STRING,
            createdBy: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return activity;
};
