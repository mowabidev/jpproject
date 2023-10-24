const express = require('express');
const { getAllSettings, getSettingById, newSetting, editSetting, deleteSetting } = require('../controllers/setting.controller.js');

const router = express.Router();

router.get("/", getAllSettings);
router.get("/:id", getSettingById);
router.post("/", newSetting);
router.patch("/:id", editSetting);
router.delete("/:id", deleteSetting);

module.exports = router;