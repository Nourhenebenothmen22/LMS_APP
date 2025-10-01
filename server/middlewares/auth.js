const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT (cookie OU header)
const verifyToken = (req, res, next) => {
  // 🔹 Essaye de récupérer le token depuis le cookie ou le header Authorization
  let token = req.cookies?.token;

  if (!token && req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // extrait le token après "Bearer"
    }
  }

  // Si aucun token trouvé
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    // Vérifie le token avec ta clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded; // stocke les infos du user dans req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
