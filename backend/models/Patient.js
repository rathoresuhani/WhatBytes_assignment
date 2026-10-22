const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
    "Patient",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "patients",
        timestamps: true
    }
);

module.exports = Patient;