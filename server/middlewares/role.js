const verifyRole = (...alloweditemtypes) => {
  return (req, res, next) => {
    console.log('User itemtype:', req.user.itemtype);
    console.log('Allowed itemtypes:', alloweditemtypes);

    if (!req.user) 
      return res.status(401).json({ message: "Unauthorized" });

    if (!alloweditemtypes.includes(req.user.itemtype)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don\'t have access to this resource" });
    }

    next();
  };
};
module.exports=verifyRole