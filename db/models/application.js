export default (sequelize, DataTypes) => {
    const application = sequelize.define(
        "application",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            customer: DataTypes.STRING,
            type: DataTypes.INTEGER,
            server: DataTypes.STRING,
            application_url: DataTypes.STRING,
            due_date: DataTypes.STRING,
            git_url: DataTypes.STRING,
            port: DataTypes.STRING,
            started_at: DataTypes.STRING,
            total_hour: DataTypes.STRING,
            spent_hour: DataTypes.STRING,
            remaining_hour: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    application.associate = function (models) {
        application.belongsTo(models.application_type, {
            as: "applicationType",
            foreignKey: "type",
        });
    };

    return application;
};
