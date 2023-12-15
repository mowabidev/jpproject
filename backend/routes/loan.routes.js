const express = require('express');
const { getAllLoans, getLoanByUserId, getLoanById, newLoan, editLoan, deleteLoan } = require('../controllers/loan.controller.js');

const router = express.Router();

router.get("/", getAllLoans);
router.get("/userId/:userId", getLoanByUserId);
//router.get("/", getLastSold);
router.get("/:id", getLoanById);
router.post("/", newLoan);
router.patch("/:id", editLoan);
router.delete("/:id", deleteLoan);

module.exports = router;