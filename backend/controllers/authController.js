const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const googleLogin = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ success: false, message: "No access token provided" });
  }

  try {
    // Fetch user info from Google
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = response.data;

    // Find or create user in the database
    let user = await User.findOne({ googleId: userInfo.id });
    if (!user) {
      user = new User({
        googleId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        profilePicture: userInfo.picture,
      });
      await user.save();
    }

    // Generate JWT for session management
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Google Login Error:", error.response?.data || error.message);
    // Provide a more specific error message if possible, otherwise a generic one
    const message = error.response?.data?.error?.message || "Authentication failed due to an internal error.";
    res.status(400).json({ success: false, message });
  }
};

module.exports = {
  googleLogin,
}; 