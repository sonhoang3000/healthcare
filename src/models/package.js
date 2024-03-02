"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Package extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here'
            }
      }
      Package.init(
            {
                  packageId: DataTypes.INTEGER,
                  name: DataTypes.STRING,
                  price: DataTypes.INTEGER,
                  address: DataTypes.STRING,
                  description: DataTypes.TEXT,
                  descriptionMarkdown: DataTypes.TEXT,
                  descriptionHTML: DataTypes.TEXT,
                  note: DataTypes.STRING,
                  image: DataTypes.TEXT,
            },
            {
                  sequelize,
                  modelName: "Package",
            }
      );
      return Package;
};
