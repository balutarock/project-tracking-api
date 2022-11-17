"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable("users");
            if (tableDefinition && !tableDefinition["status"]) {
                queryInterface.addColumn("users", "status", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
        } catch (err) {
            console.log(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable("users");
            if (tableDefinition && tableDefinition["status"]) {
                queryInterface.removeColumn("users", "status");
            }
        } catch (err) {
            console.log(err);
        }
    },
};
