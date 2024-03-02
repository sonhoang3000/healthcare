"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Package_Booking extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  Package_Booking.belongsTo(models.User,
                        { foreignKey: 'patientId', targetKey: 'id', as: 'patientPackageData' })

                  Package_Booking.belongsTo(models.Allcode, {
                        foreignKey: 'timeType', targetKey: 'keyMap',
                        as: 'timeTypeDataPatientPackage'
                  })


            }
      }
      Package_Booking.init(
            {
                  statusId: DataTypes.STRING,
                  doctorId: DataTypes.INTEGER,
                  patientId: DataTypes.INTEGER,
                  date: DataTypes.STRING,
                  timeType: DataTypes.STRING,
                  token: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Package_Booking",
            }
      );
      return Package_Booking;
};
