const express = require('express');
const { getAllUsers, getUserById, newUser, edithUser, deleteUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", newUser);
router.patch("/:id", edithUser);
router.delete("/:id", deleteUser);

module.exports = router;