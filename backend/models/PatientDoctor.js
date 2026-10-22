const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PatientDoctor = sequelize.define(
    "PatientDoctor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "patient_doctors",
        timestamps: true
    }
);

module.exports = PatientDoctor;