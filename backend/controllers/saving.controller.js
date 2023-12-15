const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllSavings = async (req, res) => {
  try {
    const Savings = await prisma.saving.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });
    res.status(200).json(Savings);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getSavingByUserId = async (req, res) => {
  console.log(req.params.userId);
  try {
    const Saving = await prisma.saving.findMany({where: {userId: parseInt(req.params.userId, 10)}});
    res.status(200).json(Saving);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getSavingById = async (req, res) => {
    try {
    const Saving = await prisma.saving.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Saving});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newSaving = async (req, res) => {
  const getLastTotal = async () => {
    const lastRecord = await prisma.saving.findFirst({
      orderBy: { id: 'desc' }
    });

    if (lastRecord && lastRecord.total !== null) {
      return lastRecord.total;
    }

    return 0;
  };

  try {
    const lastTotal = await getLastTotal();
    const total = parseInt(req.body.amount) + lastTotal;

    const saving = await prisma.saving.create({
      data: {
        total,
        user: {
          connect: { id: parseInt(req.body.user) }
        },
        createdAt: new Date(),
        amount: parseInt(req.body.amount)
      }
    });

    res.status(200).json({ saving });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



  

const editSaving = async (req, res) => {
  const getLastSold = async () => {
    const mount = await prisma.saving.findUnique({
      where: {id: parseInt(req.params.id, 10)}
    });
    return mount.sold - mount.amount;
  }

  try {
    const lastSold = await getLastSold(); // Attendre que la promesse soit résolue
    const sold = parseInt(req.body.amount) + lastSold; // Correction de la syntaxe
    const amountSaving = parseInt(req.body.amount);
    const refund = parseInt(req.body.refund);
    const currentDate = new Date();

    const schedulePayments = async (amountSaving, refund, currentDate) => {
        const paymentDates = [];
        let currentSaving = amountSaving;
        const nextMonthDate = new Date(currentDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    
        while (currentSaving > 0) {
            paymentDates.push(new Date(nextMonthDate));
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
            currentSaving -= refund;
        }
    
        return paymentDates;
    }

    const Saving = await prisma.saving.update({
      where: {id: parseInt(req.params.id, 10)},
      data: {
        ...req.body,
        sold,
        updatedAt: new Date()
      }
    });
    const refundForSaving =  await prisma.refund.findMany({
      where: {
        SavingId: Saving.id 
      }
    }); 

    for (const refSaving of refundForSaving) {
      while(refSaving){
        console.log(refSaving.id);
        await prisma.refund.delete({
          where: {
            id: refSaving.id
          }
        });
      }
    }
    
    const refundDates = await schedulePayments(amountSaving, refund, currentDate);

    for (const date of refundDates) {
      await prisma.refund.create({
        data: {
          amount: refund,
          scheduledFor: date,
          updatedAt: new Date(),
          SavingId: Saving.id
          // ... autres champs de remboursement
        }
      });
    }
    res.status(200).json({ Saving });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteSaving = async (req, res) => {
    try {
      await prisma.refund.deleteMany({where: {SavingId: parseInt(req.params.id, 10),},
      });
    const Saving = await prisma.saving.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Saving ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllSavings, getSavingByUserId, getSavingById, newSaving, editSaving, deleteSaving };