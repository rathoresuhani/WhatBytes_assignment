const Patient = require("../models/Patient");

const createPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, address } = req.body;

        if (!name || !age || !gender || !phone) {
            return res.status(400).json({
                message: "Name, age, gender and phone are required"
            });
        }

        const patient = await Patient.create({
            name,
            age,
            gender,
            phone,
            address
        });

        return res.status(201).json({
            message: "Patient created successfully",
            patient
        });

    } catch (error) {
        console.error("Create patient error:", error);

        return res.status(500).json({
            message: "Something went wrong while creating patient"
        });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();

        return res.status(200).json({
            message: "Patients fetched successfully",
            patients
        });

    } catch (error) {
        console.error("Get patients error:", error);

        return res.status(500).json({
            message: "Something went wrong while fetching patients"
        });
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            message: "Patient fetched successfully",
            patient
        });

    } catch (error) {
        console.error("Get patient error:", error);

        return res.status(500).json({
            message: "Something went wrong while fetching patient"
        });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, phone, address } = req.body;

        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        await patient.update({
            name,
            age,
            gender,
            phone,
            address
        });

        return res.status(200).json({
            message: "Patient updated successfully",
            patient
        });

    } catch (error) {
        console.error("Update patient error:", error);

        return res.status(500).json({
            message: "Something went wrong while updating patient"
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        await patient.destroy();

        return res.status(200).json({
            message: "Patient deleted successfully"
        });

    } catch (error) {
        console.error("Delete patient error:", error);

        return res.status(500).json({
            message: "Something went wrong while deleting patient"
        });
    }
};
module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};