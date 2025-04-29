const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  
  if (!token) {
    const error = new Error("Unauthorized: No token provided");
    error.status = 401;
    return next(error); // Pass error to global handler
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Consider fetching the user from DB here if more user data is needed downstream
    // const user = await User.findById(decoded.id);
    // if (!user) { /* Handle user not found */ }
    req.user = decoded; // Attach decoded payload (contains user id)
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    const authError = new Error("Unauthorized: Invalid token");
    authError.status = 401;
    next(authError); // Pass error to global handler
  }
};
