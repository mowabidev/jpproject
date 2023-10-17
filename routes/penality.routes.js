const express = require('express');
const { getAllPenalitys, getPenalityById, newPenality, editPenality, deletePenality } = require('../controllers/penality.controller.js');

const router = express.Router();

router.get("/", getAllPenalitys);
router.get("/:id", getPenalityById);
router.post("/", newPenality);
router.patch("/:id", editPenality);
router.delete("/:id", deletePenality);

module.exports = router;