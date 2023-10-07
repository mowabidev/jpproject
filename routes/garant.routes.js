const express = require('express');
const { getAllGrants, newGarant, editGarant } = require('../controllers/garant.controller.js');

const router = express.Router();

router.get("/", getAllGrants);
router.post("/", newGarant);
router.patch("/:id", editGarant);

module.exports = router;