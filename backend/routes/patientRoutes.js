const express = require("express");
const patientValidation = require("../validators/patientValidator");
const validate = require("../validators/validationMiddleware");
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    patientValidation,
    validate,
    createPatient
);
router.get("/", authenticate, getAllPatients);
router.get("/:id", authenticate, getPatientById);
router.put("/:id", authenticate, updatePatient);
router.delete("/:id", authenticate, deletePatient);
module.exports = router;