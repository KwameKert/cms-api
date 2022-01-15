const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Event = sequelize.define("Event", {
  name: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "inactive",
  },
  videoId: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  content: DataTypes.TEXT,
});

module.exports = Event;
