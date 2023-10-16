const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getUserById = async (req, res) => {
    try {
    const user = await prisma.user.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newUser = async (req, res) => {
  try {
    const users = await prisma.user.create({
      data: { ...req.body }
    });
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const edithUser = async (req, res) => {
  
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {...req.body, updatedAt: new Date()}
    });
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deleteUser = async (req, res) => {
    try {
    const user = await prisma.user.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("L'utilisateur ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}


module.exports = { getAllUsers, getUserById, newUser, edithUser, deleteUser };