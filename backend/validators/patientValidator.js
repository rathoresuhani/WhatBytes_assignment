const { body } = require("express-validator");

const patientValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("age")
        .isInt({ min: 1, max: 120 })
        .withMessage("Age must be between 1 and 120"),

    body("gender")
        .trim()
        .notEmpty()
        .withMessage("Gender is required"),

    body("phone")
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone must be a valid 10-digit number"),

    body("address")
        .optional()
        .trim()
];

module.exports = patientValidation;