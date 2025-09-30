// middlewares/validateUser.js
const { body, validationResult } = require('express-validator');

/**
 * Middleware to validate user fields for registration or update
 * @param {Array} fields - List of fields to validate
 */
const validateUser = (fields) => {
    const validations = fields.map((field) => {
        switch (field) {
            case "name":
                return body('name')
                    .notEmpty().withMessage({ name: "name", message: "Name is required" })
                    .isLength({ min: 2, max: 50 }).withMessage({ name: "name", message: "Name must be between 2 and 50 characters" });
            
            case "email":
                return body('email')
                    .notEmpty().withMessage({ name: "email", message: "Email is required" })
                    .isEmail().withMessage({ name: "email", message: "Email must be valid" });
            
            case "password":
                return body('password')
                    .notEmpty().withMessage({ name: "password", message: "Password is required" })
                    .isLength({ min: 6 }).withMessage({ name: "password", message: "Password must be at least 6 characters" })
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage({ name: "password", message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });
            
            case "phone":
                return body('phone')
                    .notEmpty().withMessage({ name: "phone", message: "Phone number is required" })
                    .matches(/^\+[1-9]\d{1,14}$/).withMessage({ name: "phone", message: "Phone number must be a valid international format (e.g., +33123456789)" });
            
            default:
                return null;
        }
    }).filter(Boolean);

    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = errors.array().map(err => ({
                    name: err.param, // Use err.param instead of err.path
                    message: err.msg.message || err.msg
                }));
                return res.status(400).json({ errors: formattedErrors });
            }
            next();
        }
    ];
};

module.exports = validateUser;
