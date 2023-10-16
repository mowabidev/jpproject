const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllGarants = async (req, res) => {
  try {
    const garants = await prisma.garant.findMany();
    res.status(200).json({garants});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getGarantById = async (req, res) => {
    console.log(req.params.id);
    try {
    const garant = await prisma.garant.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({garant});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newGarant = async (req, res) => { 
  try {
    const garant = await prisma.garant.create({
      data: {...req.body, createdAt: new Date()}
    }); 
    res.status(200).json({garant});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const editGarant = async (req, res) => {
  
  try {
    const garant = await prisma.garant.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {...req.body, updatedAt: new Date()}
    });
    res.status(200).json({garant});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deleteGarant = async (req, res) => {
    try {
    const garant = await prisma.garant.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Garant ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllGarants, getGarantById, newGarant, editGarant, deleteGarant };