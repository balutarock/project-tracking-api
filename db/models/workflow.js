export default (sequelize, DataTypes) => {
    const workflow = sequelize.define(
        "workflow",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            users: DataTypes.STRING,
            workflow_for: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return workflow;
};
