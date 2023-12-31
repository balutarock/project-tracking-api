export function up(queryInterface, Sequelize) {
    console.log("Creating server table");
    return queryInterface.createTable("server", {
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
        node_version: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        server_root: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        server_specification: {
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
    console.log("Dropping server table");
    return queryInterface.dropTable("server");
}
