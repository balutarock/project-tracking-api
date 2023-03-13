export function up(queryInterface, Sequelize) {
    console.log("Creating application_type table");
    return queryInterface.createTable("application_type", {
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
        show_application_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_due_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_git_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_port_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_remaining_hours: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_spent_hours: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_started_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        show_total_hours: {
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
    console.log("Dropping application_type table");
    return queryInterface.dropTable("application_type");
}
