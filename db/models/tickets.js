export default (sequelize, DataTypes) => {
    const tickets = sequelize.define(
        "tickets",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            summary: DataTypes.STRING,
            project: DataTypes.STRING,
            status: DataTypes.STRING,
            eta: DataTypes.STRING,
            reporter: DataTypes.INTEGER,
            assignee: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            expected_result: DataTypes.TEXT,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    tickets.associate = function (models) {
        tickets.belongsTo(models.users, {
            as: "userData",
            foreignKey: "reporter",
        });
    };

    return tickets;
};
