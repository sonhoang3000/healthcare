"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("package_schedules", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  currentNumber: {
                        type: Sequelize.INTEGER,
                  },
                  maxNumber: {
                        type: Sequelize.INTEGER,
                  },
                  date: {
                        type: Sequelize.STRING,
                  },
                  timeType: {
                        type: Sequelize.STRING,
                  },
                  packageId: {
                        type: Sequelize.INTEGER,
                  },

                  createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
                  updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
            });
      },
      down: async (queryInterface, Sequelize) => {
            await queryInterface.dropTable("package_schedules");
      },
};
