const express = require('express');
const { getAllCredits, getLoanByUserId, getCreditById, getCreditBySubscriptionId, newCredit, editCredit, deleteCredit } = require('../controllers/credit.controller.js');

const router = express.Router();

router.get("/", getAllCredits);
router.get("/userId/:userId", getLoanByUserId);
router.get("/:id", getCreditById);
router.get("/subscriptionId/:subscriptionId", getCreditBySubscriptionId);
router.post("/", newCredit);
router.patch("/:id", editCredit);
router.delete("/:id", deleteCredit);

module.exports = router;