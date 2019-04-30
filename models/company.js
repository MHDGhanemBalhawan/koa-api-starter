"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    name: {
      type: DataTypes.STRING(90)
    },
    city: {
      type: DataTypes.STRING(90)
    },
    address: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(90),
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email." },
        notEmpty: "The email is required"
      }
    }
  });
  Company.associate = models => {
    Company.hasMany(models.Job);
    Company.belongsTo(models.User);
  };
  return Company;
};
