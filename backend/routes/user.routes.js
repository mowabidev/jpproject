const express = require('express');
const { getAllUsers, getUserById, newUser, edithUser, deleteUser, getUserByEmail, getUserByPhone } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/", getAllUsers);
router.get("/checkEmail/:email", getUserByEmail);
router.get("/checkPhone/:phone", getUserByPhone);
router.get("/:id", getUserById);
router.post("/", newUser);
router.patch("/:id", edithUser);
router.delete("/:id", deleteUser);

module.exports = router;