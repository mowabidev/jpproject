const express = require('express');
const { getAllSubscriptions, getSubscriptionByUserId, getSubscriptionById, newSubscription, editSubscription, deleteSubscription } = require('../controllers/subscription.controller.js');

const router = express.Router();

router.get("/", getAllSubscriptions);
router.get("/userId/:userId", getSubscriptionByUserId);
router.get("/:id", getSubscriptionById);
router.post("/", newSubscription);
router.patch("/:id", editSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;