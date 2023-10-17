const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllPenalitys = async (req, res) => {
  try {
    const Penalitys = await prisma.penality.findMany();
    res.status(200).json({Penalitys});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getPenalityById = async (req, res) => {
    console.log(req.params.id);
    try {
    const Penality = await prisma.penality.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newPenality = async (req, res) => { 
  try {
    const Penality = await prisma.penality.create({
      data: {...req.body, createdAt: new Date()}
    }); 
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const editPenality = async (req, res) => {
  
  try {
    const Penality = await prisma.penality.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {...req.body, updatedAt: new Date()}
    });
    res.status(200).json({Penality});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deletePenality = async (req, res) => {
    try {
    const Penality = await prisma.penality.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Penality ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllPenalitys, getPenalityById, newPenality, editPenality, deletePenality };