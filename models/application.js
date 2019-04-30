"use strict";
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("Application", {
    status_id: DataTypes.INTEGER
  });

  return Application;
};
