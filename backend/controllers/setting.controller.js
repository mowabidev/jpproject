const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllSettings = async (req, res) => {
  try {
    const Settings = await prisma.setting.findMany();
    res.status(200).json({Settings});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getSettingById = async (req, res) => {
    console.log(req.params.id);
    try {
    const Setting = await prisma.setting.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Setting});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newSetting = async (req, res) => { 
  try {
    const Setting = await prisma.setting.create({
      data: {...req.body, createdAt: new Date()}
    }); 
    res.status(200).json({Setting});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const editSetting = async (req, res) => {
  
  try {
    const Setting = await prisma.setting.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {...req.body, updatedAt: new Date()}
    });
    res.status(200).json({Setting});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deleteSetting = async (req, res) => {
    try {
    const Setting = await prisma.setting.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Setting ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllSettings, getSettingById, newSetting, editSetting, deleteSetting };