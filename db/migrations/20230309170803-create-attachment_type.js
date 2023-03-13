export function up(queryInterface, Sequelize) {
    console.log("Creating attachment_type table");
    return queryInterface.createTable("attachment_type", {
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
        allowed_roles: {
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
    console.log("Dropping attachment_type table");
    return queryInterface.dropTable("attachment_type");
}
