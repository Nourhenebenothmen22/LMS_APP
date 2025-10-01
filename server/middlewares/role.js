// Middleware pour vérifier le rôle basé sur itemtype
const verifyRole = (...alloweditemtypes) => {
  return (req, res, next) => {
    if (!req.user) 
      return res.status(401).json({ message: "Unauthorized" });

    // Vérifie si l'itemType de l'utilisateur est dans la liste autorisée
    if (!alloweditemtypes.includes(req.user.itemtype)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have access to this resource" });
    }

    next();
  };
};

module.exports = verifyRole;
