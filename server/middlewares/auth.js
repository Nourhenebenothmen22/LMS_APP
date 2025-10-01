const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT depuis les cookies
const verifyToken = (req, res, next) => {
  // Récupère le token depuis les cookies au lieu du header
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;