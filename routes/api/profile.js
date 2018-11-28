// Location - Bio - Experiences - Ect

const express = require("express");
const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests post route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));
// 200 status means everything is okay

module.exports = router;