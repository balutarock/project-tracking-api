export function up(queryInterface, Sequelize) {
    console.log("Creating role table");
    return queryInterface.createTable("role", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        role_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        create_applications: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        create_customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        create_server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        create_user: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        delete_applications: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        delete_customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        delete_server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        delete_user: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        edit_applications: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        edit_customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        edit_server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        edit_user: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        view_applications: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        view_customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        view_server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        view_user: {
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
    console.log("Dropping role table");
    return queryInterface.dropTable("role");
}
