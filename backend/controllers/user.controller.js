const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'desc', 
      },
    });
    res.status(200).json( users );
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
  const userId = parseInt(req.params.id, 10);

  try {
      await prisma.$transaction(async (tx) => {
          // Supprimer les références dans d'autres tables en premier
          await tx.subscription.deleteMany({ where: { userId } });
          await tx.credit.deleteMany({ where: { userId } });
          await tx.saving.deleteMany({ where: { userId } });
          await tx.penalty.deleteMany({ where: { userId } });

          // Supprimer tous les prêts associés à l'utilisateur
          const userLoans = await tx.loan.findMany({
              where: { userId },
              select: { id: true }, // Sélectionnez uniquement l'ID pour supprimer les remboursements liés
          });

          for (const loan of userLoans) {
              await tx.refund.deleteMany({ where: { loanId: loan.id } });
          }

          await tx.loan.deleteMany({ where: { userId } });

          // Enfin, supprimer l'utilisateur
          await tx.user.delete({ where: { id: userId } });
      });

      res.status(200).json(`L'utilisateur ayant l'id ${userId} a été supprimé avec succès`);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};




module.exports = { getAllUsers, getUserById, newUser, edithUser, deleteUser, getUserByEmail, getUserByPhone };