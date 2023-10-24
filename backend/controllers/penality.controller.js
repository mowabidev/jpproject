const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllPenalitys = async (req, res) => {
  try {
    const Penalitys = await prisma.penalty.findMany();
    res.status(200).json({Penalitys});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getPenalityById = async (req, res) => {
    try {
    const Penality = await prisma.penalty.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newPenality = async (req, res) => { 
  try {
    const Penality = await prisma.penalty.create({
      data: {...req.body, createdAt: new Date()}
    }); 
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const editPenality = async (req, res) => {
  
  try {
    const Penality = await prisma.penalty.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {...req.body}
    });
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deletePenality = async (req, res) => {
    try {
    const Penality = await prisma.penalty.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Penality ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllPenalitys, getPenalityById, newPenality, editPenality, deletePenality };