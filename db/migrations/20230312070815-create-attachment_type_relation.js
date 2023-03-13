export function up(queryInterface, Sequelize) {
    console.log("Creating attachment_type_relation table");
    return queryInterface.createTable("attachment_type_relation", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        allowed_role: {
            type: Sequelize.INTEGER,
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
    console.log("Dropping attachment_type_relation table");
    return queryInterface.dropTable("attachment_type_relation");
}
