export default (sequelize, DataTypes) => {
    const role = sequelize.define(
        "role",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            role_name: DataTypes.STRING,
            status: DataTypes.STRING,
            create_applications: DataTypes.STRING,
            create_customer: DataTypes.STRING,
            create_server: DataTypes.STRING,
            create_user: DataTypes.STRING,
            delete_applications: DataTypes.STRING,
            delete_customer: DataTypes.STRING,
            delete_server: DataTypes.STRING,
            delete_user: DataTypes.STRING,
            edit_applications: DataTypes.STRING,
            edit_customer: DataTypes.STRING,
            edit_server: DataTypes.STRING,
            edit_user: DataTypes.STRING,
            view_applications: DataTypes.STRING,
            view_customer: DataTypes.STRING,
            view_server: DataTypes.STRING,
            view_user: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return role;
};
