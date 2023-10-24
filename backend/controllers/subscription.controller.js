const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllSubscriptions = async (req, res) => {
  try {
    const Subscriptions = await prisma.subscription.findMany();
    res.status(200).json({Subscriptions});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getSubscriptionById = async (req, res) => {
    console.log(req.params.id);
    try {
    const Subscription = await prisma.subscription.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Subscription});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newSubscription = async (req, res) => {
  const getLastTotal = async () => {
    const mount = await prisma.subscription.findFirst({
      orderBy: { id: 'desc' }
    });
  
    if (mount && mount.total !== null) {
      return mount.total;
    }
  
    return 0;
  }  
  
    try {
      const lastTotal = await getLastTotal(); // Attendre que la promesse soit résolue
      const total = parseInt(req.body.amount) + lastTotal; // Correction de la syntaxe
  
      const Subscription = await prisma.subscription.create({
        data: {
          ...req.body,
          total,
          createdAt: new Date()
        }
      });
  
      res.status(200).json({ Subscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  

const editSubscription = async (req, res) => {
    const getLastTotal = async () => {
      const mount = await prisma.subscription.findUnique({
        where: {id: parseInt(req.params.id, 10)}
      });
      return mount.total - mount.amount;
    }
  
    try {
      const lastTotal = await getLastTotal(); // Attendre que la promesse soit résolue
      const total = parseInt(req.body.amount) + lastTotal; // Correction de la syntaxe
      
      const Subscription = await prisma.subscription.update({
        where: {id: parseInt(req.params.id, 10)},
        data: {
          ...req.body,
          total,
          updatedAt: new Date()
        }
      });
  
      res.status(200).json({ Subscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const deleteSubscription = async (req, res) => {
    try {
    const Subscription = await prisma.subscription.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Subscription ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllSubscriptions, getSubscriptionById, newSubscription, editSubscription, deleteSubscription };