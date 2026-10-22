const PatientDoctor = require("../models/PatientDoctor");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;

        if (!patientId || !doctorId) {
            return res.status(400).json({
                message: "Patient ID and Doctor ID are required"
            });
        }

        const patient = await Patient.findByPk(patientId);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const doctor = await Doctor.findByPk(doctorId);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        const existingMapping = await PatientDoctor.findOne({
            where: {
                patientId,
                doctorId
            }
        });

        if (existingMapping) {
            return res.status(409).json({
                message: "Doctor is already assigned to this patient"
            });
        }

        const mapping = await PatientDoctor.create({
            patientId,
            doctorId
        });

        return res.status(201).json({
            message: "Doctor assigned to patient successfully",
            mapping
        });

    } catch (error) {
        console.error("Assign doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while assigning doctor"
        });
    }
};

const getPatientDoctors = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patient = await Patient.findByPk(patientId);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const mappings = await PatientDoctor.findAll({
            where: {
                patientId
            },
            include: [
                {
                    model: Doctor,
                    attributes: ["id", "name", "specialization", "phone", "email"]
                }
            ]
        });

        return res.status(200).json({
            message: "Doctors fetched successfully",
            doctors: mappings.map(mapping => mapping.Doctor)
        });

    } catch (error) {
        console.error("Get patient doctors error:", error);

        return res.status(500).json({
            message: "Something went wrong while fetching doctors"
        });
    }
};

const removeDoctorFromPatient = async (req, res) => {
    try {
        const { patientId, doctorId } = req.params;

        const mapping = await PatientDoctor.findOne({
            where: {
                patientId,
                doctorId
            }
        });

        if (!mapping) {
            return res.status(404).json({
                message: "Doctor is not assigned to this patient"
            });
        }

        await mapping.destroy();

        return res.status(200).json({
            message: "Doctor removed from patient successfully"
        });

    } catch (error) {
        console.error("Remove doctor error:", error);

        return res.status(500).json({
            message: "Something went wrong while removing doctor"
        });
    }
};
module.exports = {
    assignDoctor,
    getPatientDoctors,
    removeDoctorFromPatient
};