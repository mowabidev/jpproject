const express = require('express');
const { getAllSavings, getSavingByUserId, getSavingById, newSaving, editSaving, deleteSaving } = require('../controllers/saving.controller.js');

const router = express.Router();

router.get("/", getAllSavings);
router.get("/userId/:userId", getSavingByUserId);
//router.get("/", getLastSold);
router.get("/:id", getSavingById);
router.post("/", newSaving);
router.patch("/:id", editSaving);
router.delete("/:id", deleteSaving);

module.exports = router;