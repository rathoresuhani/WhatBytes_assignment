const { body } = require("express-validator");

const doctorValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("specialization")
        .trim()
        .notEmpty()
        .withMessage("Specialization is required"),

    body("phone")
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone must be a valid 10-digit number"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email")
];

module.exports = doctorValidation;