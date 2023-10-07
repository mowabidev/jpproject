const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllGrants = async (req, res) => {
  try {
    const garants = await prisma.garant.findMany();
    res.status(200).json({garants});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newGarant = async (req, res) => {

  try {
    const user = await prisma.garant.create({
      data: {...req.body, createdAt: new Date()}
    });
    res.status(200).json({user});
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

module.exports = { getAllGrants, newGarant, editGarant };