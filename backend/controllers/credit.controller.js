const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllCredits = async (req, res) => {
  try {
    const Credits = await prisma.credit.findMany();
    res.status(200).json({Credits});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getCreditByUserId = async (req, res) => {
  console.log(req.params.userId);
  try {
    const credit = await prisma.credit.findMany({where: {userId: parseInt(req.params.userId, 10)}});
    res.status(200).json(credit);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getCreditById = async (req, res) => {
    try {
    const Credit = await prisma.credit.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Credit});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getCreditBySubscriptionId = async (req, res) => {
  try {
    const credit = await prisma.credit.findMany({where: {subscriptionId: parseInt(req.params.subscriptionId, 10)}});
    res.status(200).json(credit);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newCredit = async (req, res) => {
    const getLastTotal = async () => {
      const number = await prisma.credit.findFirst({
        orderBy: { id: 'desc' }
      });
  
      if (number && number.total !== null) {
        return number.total;
      }
    
      return 0;
    }
  
    try {
      const lastTotal = await getLastTotal(); // Attendre que la promesse soit résolue
      const total = (parseInt(req.body.new ) + parseInt(lastTotal)).toString(); // Correction de la syntaxe
      const Credit = await prisma.credit.create({
        data: {
          ...req.body,
          total,
          updatedAt: new Date()
        }
      });
  
      res.status(200).json({ Credit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  

const editCredit = async (req, res) => {
    const getLastTotal = async () => {
      const mount = await prisma.credit.findFirst({
        orderBy: { id: 'desc' }
      });
      return mount.total - mount.new;
    }
  
    try {
      const lastTotal = await getLastTotal(); // Attendre que la promesse soit résolue
      const total = (parseInt(req.body.new) + parseInt(lastTotal)).toString(); // Correction de la syntaxe
        
      const Credit = await prisma.credit.update({
        where: {id: parseInt(req.params.id, 10)},
        data: {
          ...req.body,
          total,
          updatedAt: new Date()
        }
      });
  
      res.status(200).json({ Credit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const deleteCredit = async (req, res) => {
    try {
    const Credit = await prisma.credit.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Credit ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllCredits, getCreditByUserId, getCreditById, getCreditBySubscriptionId, newCredit, editCredit, deleteCredit };