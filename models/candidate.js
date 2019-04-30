"use strict";
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define("Candidate", {
    firstName: {
      type: DataTypes.STRING(90)
    },
    lastName: {
      type: DataTypes.STRING(90)
    },
    address: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid email." },
        notEmpty: "The email is required"
      }
    }
  });
  Candidate.associate = models => {
    Candidate.belongsToMany(models.Job, {
      through: "Application"
    });
    Candidate.belongsTo(models.User);
  };

  return Candidate;
};
