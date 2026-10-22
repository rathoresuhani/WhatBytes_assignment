const Doctor = require("../models/Doctor");

const createDoctor = async (req, res) => {
    try {
        const { name, specialization, phone, email } = req.body;

        if (!name || !specialization || !phone || !email) {
            return res.status(400).json({
                message: "Name, specialization, phone and email are required"
            });
        }

        const existingDoctor = await Doctor.findOne({
            where: { email }
        });

        if (existingDoctor) {
            return res.status(409).json({
                message: "Doctor with this email already exists"
            });
        }

        const doctor = await Doctor.create({
            name,
            specialization,
            phone,
            email
        });

        return res.status(201).json({
            message: "Doctor created successfully",
            doctor
        });

    } catch (error) {
        console.error("Create doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while creating doctor"
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();

        return res.status(200).json({
            message: "Doctors fetched successfully",
            doctors
        });

    } catch (error) {
        console.error("Get doctors error:", error);

        return res.status(500).json({
            message: "Something went wrong while fetching doctors"
        });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            message: "Doctor fetched successfully",
            doctor
        });

    } catch (error) {
        console.error("Get doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while fetching doctor"
        });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialization, phone, email } = req.body;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        // Check if the new email belongs to another doctor
        const existingDoctor = await Doctor.findOne({
            where: { email }
        });

        if (existingDoctor && existingDoctor.id !== doctor.id) {
            return res.status(409).json({
                message: "Another doctor already uses this email"
            });
        }

        await doctor.update({
            name,
            specialization,
            phone,
            email
        });

        return res.status(200).json({
            message: "Doctor updated successfully",
            doctor
        });

    } catch (error) {
        console.error("Update doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while updating doctor"
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        await doctor.destroy();

        return res.status(200).json({
            message: "Doctor deleted successfully"
        });

    } catch (error) {
        console.error("Delete doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while deleting doctor"
        });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};