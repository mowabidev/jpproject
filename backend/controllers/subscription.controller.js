const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      }
    });

    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getSubscriptionByUserId = async (req, res) => {
  console.log(req.params.userId);
  try {
    const subscription = await prisma.subscription.findMany(
      {
        where: {userId: parseInt(req.params.userId, 10)},
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        }
      });
    res.status(200).json(subscription);
  } 
  catch (error) {
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
  /*const getLastTotal = async () => {
    const mount = await prisma.subscription.findFirst({
      orderBy: { id: 'desc' }
    });
  
    if (mount && mount.total !== null) {
      return mount.total;
    }
  
    return 0;
  }  */
  
    try {
      //const lastTotal = await getLastTotal(); // Attendre que la promesse soit résolue
      //const total = parseInt(req.body.amount) + lastTotal; // Correction de la syntaxe
  
      const subscription = await prisma.subscription.create({
        data: {
          ...req.body,
          createdAt: new Date()
        }
      });
  
      res.status(200).json({ subscription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  

const editSubscription = async (req, res) => {
    const getLastTotal = async () => {
      const mount = await prisma.subscription.findFirst({
        orderBy: { updatedAt: 'desc' }
      });
    
      if (mount && mount.total !== null) {
        return mount.total;
      }
    
      return 0;
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

module.exports = { getAllSubscriptions, getSubscriptionByUserId, getSubscriptionById, newSubscription, editSubscription, deleteSubscription };