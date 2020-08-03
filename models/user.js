module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return User;
};
