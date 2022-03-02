"use strict";

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.UUID(60),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer: {
      type: DataTypes.STRING,
      defaultValue: "entrepreneur"
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Users;
};
//# sourceMappingURL=Users.dev.js.map
