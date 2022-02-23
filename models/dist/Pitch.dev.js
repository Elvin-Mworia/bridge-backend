"use strict";

module.exports = function (sequelize, DataTypes) {
  var Pitch = sequelize.define("Pitch", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    entreprenuer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pitch: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Pitch;
};
//# sourceMappingURL=Pitch.dev.js.map
