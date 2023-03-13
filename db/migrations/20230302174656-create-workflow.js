export function up(queryInterface, Sequelize) {
    console.log("Creating workflow table");
    return queryInterface.createTable("workflow", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        users: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        workflow_for: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: true,
            type: Sequelize.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
        },
    });
}
export function down(queryInterface, Sequelize) {
    console.log("Dropping workflow table");
    return queryInterface.dropTable("workflow");
}
