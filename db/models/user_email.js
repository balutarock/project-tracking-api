export default (sequelize, DataTypes) => {
    const user_email = sequelize.define(
        "user_email",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return user_email;
};
