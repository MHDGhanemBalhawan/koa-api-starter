"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email." },
        notEmpty: "The email is required"
      }
    },
    password: {
      type: DataTypes.STRING(90),
      allowNull: false
    }
  });

  return User;
};
