// Just authentication

const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests post route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
// 200 status means everything is okay

module.exports = router;
