export default (sequelize, DataTypes) => {
    const application_hosting = sequelize.define(
        "application_hosting",
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
            server: DataTypes.STRING,
            application_url: DataTypes.STRING,
            due_date: DataTypes.STRING,
            git_url: DataTypes.STRING,
            port: DataTypes.STRING,
            started_at: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return application_hosting;
};
