const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data" });
        }

        // Debug logging
        console.log('User role from token:', req.user.itemtype);
        console.log('Allowed roles:', allowedRoles);

        if (!req.user.itemtype) {
            return res.status(403).json({ message: "Forbidden: User role not defined" });
        }

        if (!allowedRoles.includes(req.user.itemtype)) {
            return res.status(403).json({ 
                message: `Forbidden: ${req.user.itemtype} role cannot access this resource` 
            });
        }

        next();
    };
};

module.exports = verifyRole;