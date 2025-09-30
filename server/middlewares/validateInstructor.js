// middlewares/validateInstructor.js
const { validationResult, body, param } = require("express-validator");

const validateInstructor = (fields) => {
  const validations = fields.map((field) => {
    switch (field) {
      case "id":
        return param("id")
          .notEmpty().withMessage({ name: "id", message: "Instructor ID is required" })
          .isMongoId().withMessage({ name: "id", message: "Invalid MongoDB ID format" });

      case "specialization":
        return body("specialization")
          .notEmpty().withMessage({ name: "specialization", message: "Specialization is required" })
          .isLength({ min: 3 }).withMessage({ name: "specialization", message: "Specialization must be at least 3 characters" });

      case "experienceYears":
        return body("experienceYears")
          .optional()
          .isInt({ min: 0 }).withMessage({ name: "experienceYears", message: "Experience must be a non-negative integer" });

      case "courses":
        return body("courses")
          .optional()
          .isArray().withMessage({ name: "courses", message: "Courses must be an array of IDs" });

      case "level":
        return body("level")
          .optional()
          .isIn(["Professor", "Master Professor"])
          .withMessage({ name: "level", message: "Level must be Professor, Senior Professor, or Master Professor" });

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

module.exports = validateInstructor;
