// middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  // Ensure req.user is set by authMiddleware
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admins only." });
};

export default adminMiddleware;
