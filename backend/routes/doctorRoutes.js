const express = require("express");
const doctorValidation = require("../validators/doctorValidator");
const validate = require("../validators/validationMiddleware");
const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctorController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    doctorValidation,
    validate,
    createDoctor
);
router.get("/", authenticate, getAllDoctors);
router.get("/:id", authenticate, getDoctorById);
router.put("/:id", authenticate, updateDoctor);
router.delete("/:id", authenticate, deleteDoctor);

module.exports = router;