export function up(queryInterface, Sequelize) {
    console.log("Creating application table");
    return queryInterface.createTable("application", {
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
        server: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        application_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        due_date: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        git_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        port: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        started_at: {
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
    console.log("Dropping application table");
    return queryInterface.dropTable("application");
}
