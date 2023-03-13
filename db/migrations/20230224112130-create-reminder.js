export function up(queryInterface, Sequelize) {
    console.log("Creating reminder table");
    return queryInterface.createTable("reminder", {
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
        appId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        send_slack_notification: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        remind_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        cc_email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        to_email: {
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
    console.log("Dropping reminder table");
    return queryInterface.dropTable("reminder");
}
