const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

const getAllLoans = async (req, res) => {
  try {
    const Loans = await prisma.loan.findMany();
    res.status(200).json({Loans});
  } catch (error) {
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
    const lastSold = await getLastSold(); // Attendre que la promesse soit résolue
    const sold = parseInt(req.body.amount) + lastSold; // Correction de la syntaxe
    const amountLoan = parseInt(req.body.amount);
    const refund = parseInt(req.body.refund);
    const startDate = new Date();

    const schedulePayments = async (amountLoan, refund, startDate) => {
        const paymentDates = [];
        let currentLoan = amountLoan;
        let currentDate = new Date(startDate);
    
        while (currentLoan > 0) {
            paymentDates.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentLoan -= refund;
            if (currentLoan < 0) currentLoan = 0;
        }
    
        return paymentDates;
    }
    
    const refundDates = await schedulePayments(amountLoan, refund, startDate);

    const Loan = await prisma.loan.create({
      data: {
        ...req.body,
        sold,
        date: new Date()
      }
    });
    res.status(200).json({ Loan });
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
  } catch (error) {
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
    const startDate = new Date();

    const schedulePayments = async (amountLoan, refund, startDate) => {
        const paymentDates = [];
        let currentLoan = amountLoan;
        let currentDate = new Date(startDate);
    
        while (currentLoan > 0) {
            paymentDates.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentLoan -= refund;
            if (currentLoan < 0) currentLoan = 0;
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
    
    const refundDates = await schedulePayments(amountLoan, refund, startDate);

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
    const Loan = await prisma.loan.delete({where: {id: parseInt(req.params.id, 10)}});
    res.status(200).json("Loan ayant l'id "+ req.params.id + " à été supprimé");
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = { getAllLoans, getLoanById, newLoan, editLoan, deleteLoan };