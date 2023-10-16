const express = require('express');
const { getAllCredits, getCreditById, newCredit, editCredit, deleteCredit } = require('../controllers/credit.controller.js');

const router = express.Router();

router.get("/", getAllCredits);
//router.get("/", getLastTotal);
router.get("/:id", getCreditById);
router.post("/", newCredit);
router.patch("/:id", editCredit);
router.delete("/:id", deleteCredit);

module.exports = router;