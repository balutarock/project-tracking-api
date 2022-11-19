"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "customer"
            );
            if (tableDefinition && !tableDefinition["primary_contact_name"]) {
                queryInterface.addColumn("customer", "primary_contact_name", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["primary_contact_email"]) {
                queryInterface.addColumn("customer", "primary_contact_email", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["primary_contact_phone"]) {
                queryInterface.addColumn("customer", "primary_contact_phone", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["secondary_contact_name"]) {
                queryInterface.addColumn("customer", "secondary_contact_name", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (
                tableDefinition &&
                !tableDefinition["secondary_contact_email"]
            ) {
                queryInterface.addColumn(
                    "customer",
                    "secondary_contact_email",
                    {
                        type: Sequelize.STRING,
                        allowNull: true,
                    }
                );
            }
            if (
                tableDefinition &&
                !tableDefinition["secondary_contact_phone"]
            ) {
                queryInterface.addColumn(
                    "customer",
                    "secondary_contact_phone",
                    {
                        type: Sequelize.STRING,
                        allowNull: true,
                    }
                );
            }
        } catch (err) {
            console.log(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "customer"
            );
            if (tableDefinition && tableDefinition["primary_contact_name"]) {
                queryInterface.removeColumn("customer", "primary_contact_name");
            }
            if (tableDefinition && tableDefinition["primary_contact_email"]) {
                queryInterface.removeColumn(
                    "customer",
                    "primary_contact_email"
                );
            }
            if (tableDefinition && tableDefinition["primary_contact_phone"]) {
                queryInterface.removeColumn(
                    "customer",
                    "primary_contact_phone"
                );
            }
            if (tableDefinition && tableDefinition["secondary_contact_name"]) {
                queryInterface.removeColumn(
                    "customer",
                    "secondary_contact_name"
                );
            }
            if (tableDefinition && tableDefinition["secondary_contact_email"]) {
                queryInterface.removeColumn(
                    "customer",
                    "secondary_contact_email"
                );
            }
            if (tableDefinition && tableDefinition["secondary_contact_phone"]) {
                queryInterface.removeColumn(
                    "customer",
                    "secondary_contact_phone"
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
