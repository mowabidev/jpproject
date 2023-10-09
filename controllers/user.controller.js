const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllMembers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newUser = async (req, res) => {
  /* console.log(req.body);
  res.status(200).json(req.body) */

  try {
    const users = await prisma.user.create({
      data: { ...req.body }
    });
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllMembers, newUser };