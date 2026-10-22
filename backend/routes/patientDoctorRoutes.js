const express = require("express");

const {
    assignDoctor,
    getPatientDoctors,
    removeDoctorFromPatient
} = require("../controllers/patientDoctorController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, assignDoctor);
router.get("/patient/:patientId", authenticate, getPatientDoctors);
router.delete(
    "/patient/:patientId/doctor/:doctorId",
    authenticate,
    removeDoctorFromPatient
);

module.exports = router;