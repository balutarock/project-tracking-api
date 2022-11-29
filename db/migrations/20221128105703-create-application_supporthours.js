export function up(queryInterface, Sequelize) {
    console.log("Creating application_supporthours table");
    return queryInterface.createTable("application_supporthours", {
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
        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        started_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        application_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        total_hour: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        spent_hour: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        remaining_hour: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        due_date: {
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
    console.log("Dropping application_supporthours table");
    return queryInterface.dropTable("application_supporthours");
}
