// middlewares/validateCourse.js
const { validationResult, body, param } = require("express-validator");

/**
 * Middleware for validating Course fields
 * @param {Array} fields - List of fields to validate
 */
const validateCourse = (fields) => {
  const validations = fields.map((field) => {
    switch (field) {
      case "id":
        return param("id")
          .notEmpty().withMessage({ name: "id", message: "Course ID is required" })
          .isMongoId().withMessage({ name: "id", message: "Invalid MongoDB ID format" });

      case "title":
        return body("title")
          .notEmpty().withMessage({ name: "title", message: "Title is required" })
          .isLength({ min: 3 }).withMessage({ name: "title", message: "Title must be at least 3 characters long" });

      case "description":
        return body("description")
          .optional()
          .isLength({ max: 500 }).withMessage({ name: "description", message: "Description must not exceed 500 characters" });

      case "code":
        return body("code")
          .notEmpty().withMessage({ name: "code", message: "Course code is required" })
          .isAlphanumeric().withMessage({ name: "code", message: "Course code must be alphanumeric" });

      case "instructor":
        return body("instructor")
          .notEmpty().withMessage({ name: "instructor", message: "Instructor ID is required" })
          .isMongoId().withMessage({ name: "instructor", message: "Instructor must be a valid MongoDB ID" });

      case "students":
        return body("students")
          .optional()
          .isArray().withMessage({ name: "students", message: "Students must be an array of IDs" });

      case "startDate":
        return body("startDate")
          .optional()
          .isISO8601().withMessage({ name: "startDate", message: "Start date must be a valid date" });

      case "endDate":
        return body("endDate")
          .optional()
          .isISO8601().withMessage({ name: "endDate", message: "End date must be a valid date" });

      case "credits":
        return body("credits")
          .optional()
          .isInt({ min: 1 }).withMessage({ name: "credits", message: "Credits must be a positive integer" });

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

module.exports = validateCourse;
