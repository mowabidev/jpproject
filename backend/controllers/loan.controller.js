const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllLoans = async (req, res) => {
  try {
    const Loans = await prisma.loan.findMany({
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
    res.status(200).json(Loans);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getLoanByUserId = async (req, res) => {
  console.log(req.params.userId);
  try {
    const loan = await prisma.loan.findMany({
      where: {userId: parseInt(req.params.userId, 10)},
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        }
      }
    });
    res.status(200).json(loan);
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getLoanById = async (req, res) => {
    try {
    const Loan = await prisma.loan.findUnique({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json({Loan});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const newLoan = async (req, res) => {
  const getLastSold = async () => {
    const mount = await prisma.loan.findFirst({
      orderBy: { id: 'desc' }
    });
  
    if (mount && mount.sold !== null) {
      return mount.sold;
    }
  
    return 0;
  }  
  
  try {
    const lastSold = await getLastSold();
    const sold = parseInt(req.body.amount) + lastSold;
    const amountLoan = parseInt(req.body.amount);
    const refund = parseInt(req.body.refund);
    const currentDate = new Date();

    // Première requête - Création de prêt
    const Loan = await prisma.loan.create({
      data: {
        ...req.body,
        sold
      }
    });
    res.status(200).json({ Loan });

    // Deuxième requête - Création des remboursements
    const schedulePayments = async (amountLoan, refund, currentDate) => {
      const paymentDates = [];
      let currentLoan = amountLoan;
      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

      while (currentLoan > 0) {            
        paymentDates.push(new Date(nextMonthDate));
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        currentLoan -= refund;
      }

      return paymentDates;
    }

    const refundDates = await schedulePayments(amountLoan, refund, currentDate);

    for (const date of refundDates) {
      try {
        await prisma.refund.create({
          data: {
            amount: refund,
            scheduledFor: date,
            updatedAt: new Date(),
            loanId: Loan.id
          }
        });
      } catch (refundError) {
        // Gestion des erreurs pour la création des remboursements
        console.error('Erreur lors de la création du remboursement :', refundError);
        // Vous pouvez choisir de renvoyer une réponse d'erreur appropriée ici
      }
    }
  } catch (error) {
    // Gestion des erreurs générales
    res.status(500).json({ error: error.message });
  }
}

  

const editLoan = async (req, res) => {
  const getLastSold = async () => {
    const mount = await prisma.loan.findUnique({
      where: {id: parseInt(req.params.id, 10)}
    });
    return mount.sold - mount.amount;
  }

  try {
    const lastSold = await getLastSold(); // Attendre que la promesse soit résolue
    const sold = parseInt(req.body.amount) + lastSold; // Correction de la syntaxe
    const amountLoan = parseInt(req.body.amount);
    const refund = parseInt(req.body.refund);
    const currentDate = new Date();

    const schedulePayments = async (amountLoan, refund, currentDate) => {
        const paymentDates = [];
        let currentLoan = amountLoan;
        const nextMonthDate = new Date(currentDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    
        while (currentLoan > 0) {
            paymentDates.push(new Date(nextMonthDate));
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
            currentLoan -= refund;
        }
    
        return paymentDates;
    }

    const Loan = await prisma.loan.update({
      where: {id: parseInt(req.params.id, 10)},
      data: {
        ...req.body,
        sold,
        updatedAt: new Date()
      }
    });
    const refundForLoan =  await prisma.refund.findMany({
      where: {
        loanId: Loan.id 
      }
    }); 

    for (const refLoan of refundForLoan) {
      while(refLoan){
        console.log(refLoan.id);
        await prisma.refund.delete({
          where: {
            id: refLoan.id
          }
        });
      }
    }
    
    const refundDates = await schedulePayments(amountLoan, refund, currentDate);

    for (const date of refundDates) {
      await prisma.refund.create({
        data: {
          amount: refund,
          scheduledFor: date,
          updatedAt: new Date(),
          loanId: Loan.id
          // ... autres champs de remboursement
        }
      });
    }
    res.status(200).json({ Loan });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteLoan = async (req, res) => {
    try {
      await prisma.refund.deleteMany({where: {loanId: parseInt(req.params.id, 10),},
      });
    const Loan = await prisma.loan.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Loan ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllLoans, getLoanByUserId, getLoanById, newLoan, editLoan, deleteLoan };