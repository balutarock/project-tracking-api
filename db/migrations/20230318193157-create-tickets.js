export function up(queryInterface, Sequelize) {
    console.log("Creating tickets table");
    return queryInterface.createTable("tickets", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        summary: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        project: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        eta: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        reporter: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        assignee: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        expected_result: {
            type: Sequelize.TEXT,
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
    console.log("Dropping tickets table");
    return queryInterface.dropTable("tickets");
}
