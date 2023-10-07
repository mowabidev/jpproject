const express = require('express');
const { getAllMembers, newUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/", getAllMembers);
router.post("/", newUser);

module.exports = router;