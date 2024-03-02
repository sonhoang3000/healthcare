"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Package_Schedule extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  Package_Schedule.belongsTo(models.Allcode,
                        {
                              foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataPackage'
                        })

                  Package_Schedule.belongsTo(models.User,
                        { foreignKey: 'packageId', targetKey: 'id', as: 'packageData' })

            }
      }
      Package_Schedule.init(
            {
                  currentNumber: DataTypes.INTEGER,
                  maxNumber: DataTypes.INTEGER,
                  date: DataTypes.STRING,
                  timeType: DataTypes.STRING,
                  packageId: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "Package_Schedule",
            }
      );
      return Package_Schedule;
};
