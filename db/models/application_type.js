export default (sequelize, DataTypes) => {
    const application_type = sequelize.define(
        "application_type",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            show_application_url: DataTypes.STRING,
            show_customer: DataTypes.STRING,
            show_due_at: DataTypes.STRING,
            show_git_url: DataTypes.STRING,
            show_port_number: DataTypes.STRING,
            show_remaining_hours: DataTypes.STRING,
            show_server: DataTypes.STRING,
            show_spent_hours: DataTypes.STRING,
            show_started_at: DataTypes.STRING,
            show_total_hours: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return application_type;
};
