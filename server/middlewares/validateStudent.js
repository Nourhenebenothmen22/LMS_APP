// middlewares/validateStudent.js
const { validationResult, body, param } = require("express-validator");

/**
 * Middleware for validating Student fields
 * @param {Array} fields - List of fields to validate
 */
const validateStudent = (fields) => {
  const validations = fields.map((field) => {
    switch (field) {
      case "id":
        return param("id")
          .notEmpty().withMessage({ name: "id", message: "Student ID is required" })
          .isMongoId().withMessage({ name: "id", message: "Invalid MongoDB ID format" });

      case "courses":
        return body("courses")
          .optional()
          .isArray().withMessage({ name: "courses", message: "Courses must be an array" })

      case "level":
        return body("level")
          .optional()
          .isIn(["Bachelor", "Master", "PhD"])
          .withMessage({ name: "level", message: "Level must be Bachelor, Master, or PhD" });

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
          name: err.path,
          message: err.msg.message || err.msg
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      next();
    }
  ];
};

module.exports = validateStudent;
