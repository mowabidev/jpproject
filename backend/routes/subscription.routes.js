const express = require('express');
const { getAllSubscriptions, getSubscriptionById, newSubscription, editSubscription, deleteSubscription } = require('../controllers/subscription.controller.js');

const router = express.Router();

router.get("/", getAllSubscriptions);
//router.get("/", getLastTotal);
router.get("/:id", getSubscriptionById);
router.post("/", newSubscription);
router.patch("/:id", editSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;