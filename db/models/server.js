export default (sequelize, DataTypes) => {
    const server = sequelize.define(
        "server",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            node_version: DataTypes.STRING,
            server_root: DataTypes.STRING,
            server_specification: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return server;
};
