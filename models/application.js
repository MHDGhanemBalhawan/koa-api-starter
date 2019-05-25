"use strict";
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("Application", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status_id: DataTypes.INTEGER
  });
  Application.associate = models => {
    Application.belongsTo(models.User);
    Application.belongsTo(models.Candidate);
  };
  return Application;
};
