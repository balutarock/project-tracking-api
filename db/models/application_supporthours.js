export default (sequelize, DataTypes) => {
    const application_supporthours = sequelize.define(
        "application_supporthours",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            customer: DataTypes.STRING,
            type: DataTypes.STRING,
            started_at: DataTypes.STRING,
            application_url: DataTypes.STRING,
            total_hour: DataTypes.STRING,
            spent_hour: DataTypes.STRING,
            remaining_hour: DataTypes.STRING,
            due_date: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return application_supporthours;
};
