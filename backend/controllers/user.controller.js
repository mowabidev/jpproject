const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'desc', 
      },
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
  }
};


const getUserById = async (req, res) => {
    try {
    const user = await prisma.user.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getUserByEmail = async (req, res) => {
  try {
  const user = await prisma.user.findUnique({where: {email: req.params.email}});
  res.status(200).json(user);
} catch (error) {
  res.status(500).json({error: error.message})
}
}

const getUserByPhone = async (req, res) => {
  try {
  const user = await prisma.user.findUnique({where: {phone: req.params.phone}});
  res.status(200).json(user);
} catch (error) {
  res.status(500).json({error: error.message})
}
}

const newUser = async (req, res) => {
  try {
    const { garantId, ...userData } = req.body;
    console.log(garantId, userData);

    const user = await prisma.user.create({
      data: { garantId: parseInt(garantId, 10), password: "1234", ...userData }
    });

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

      // Supprimer les références dans d'autres tables en premier
      await prisma.subscription.deleteMany({where: {userId: parseInt(req.params.id, 10),},
      });

      // Ensuite, supprimer l'utilisateur
      const user = await prisma.user.delete({where: { id: parseInt(req.params.id, 10) },
      });
      res.status(200).json("L'utilisateur ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};



module.exports = { getAllUsers, getUserById, newUser, edithUser, deleteUser, getUserByEmail, getUserByPhone };