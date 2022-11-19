"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "server"
            );
            if (tableDefinition && !tableDefinition["node_version"]) {
                queryInterface.addColumn("server", "node_version", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["server_root"]) {
                queryInterface.addColumn("server", "server_root", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["server_specification"]) {
                queryInterface.addColumn("server", "server_specification", {
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
            const tableDefinition = await queryInterface.describeTable(
                "server"
            );
            if (tableDefinition && tableDefinition["node_version"]) {
                queryInterface.removeColumn("server", "node_version");
            }
            if (tableDefinition && tableDefinition["server_root"]) {
                queryInterface.removeColumn("server", "server_root");
            }
            if (tableDefinition && tableDefinition["server_specification"]) {
                queryInterface.removeColumn("server", "server_specification");
            }
        } catch (err) {
            console.log(err);
        }
    },
};
