const express = require('express');
const { getAllGarants, getGarantById, newGarant, editGarant, deleteGarant } = require('../controllers/garant.controller.js');

const router = express.Router();

router.get("/", getAllGarants);
router.get("/:id", getGarantById);
router.post("/", newGarant);
router.patch("/:id", editGarant);
router.delete("/:id", deleteGarant);

module.exports = router;