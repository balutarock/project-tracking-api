export function up(queryInterface, Sequelize) {
    console.log("Creating customer table");
    return queryInterface.createTable("customer", {
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
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        primary_contact_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        primary_contact_email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        primary_contact_phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        secondary_contact_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        secondary_contact_email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        secondary_contact_phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
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
    console.log("Dropping customer table");
    return queryInterface.dropTable("customer");
}
