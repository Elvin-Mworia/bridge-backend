"use strict";

module.exports = function (sequelize, DataTypes) {
  var IdeasBought = sequelize.define("IdeasBought", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return IdeasBought;
};
//# sourceMappingURL=Ideasbought.dev.js.map
