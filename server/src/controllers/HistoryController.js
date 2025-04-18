const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createHistory = async (req, res) => {
  try {
    const {
      appointmentRequestId,
      proceduresPerformed,
      petConditionAfter,
      recommendationsForOwner,
      veterinariansNotes,
      paymentTimestamp,
      paymentMethod,
      amount,
    } = req.body;

    if (!appointmentRequestId) {
      return res
        .status(400)
        .json({ error: "AppointmentRequestId is required" });
    }

    const appointmentRequest = await prisma.appointmentRequest.findUnique({
      where: { id: appointmentRequestId },
      select: { ownerId: true },
    });

    if (!appointmentRequest) {
      return res.status(404).json({ error: "AppointmentRequest not found" });
    }

    const history = await prisma.history.create({
      data: {
        proceduresPerformed,
        petConditionAfter,
        recommendationsForOwner,
        veterinariansNotes,
        paymentDate: new Date(paymentTimestamp),
        paymentMethod,
        amount: parseFloat(amount),
        appointmentRequest: {
          connect: { id: appointmentRequestId },
        },
        owner: {
          connect: { id: appointmentRequest.ownerId },
        },
      },
    });

    await prisma.appointmentRequest.update({
      where: { id: appointmentRequestId },
      data: { status: "Successful" },
    });

    res.status(201).json(history);
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPostAppointmentDetails = async (req, res) => {
  try {
    const appointmentRequests = await prisma.appointmentRequest.findMany({
      where: { status: "Successful" },
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
        history: true,
      },
    });

    const formattedRequests = appointmentRequests.map((request) => ({
      id: request.id,
      owner: request.owner,
      pet: request.pet,
      assignedVet: request.assignedVet,
      appointmentDate: request.appointmentDate,
      appointmentType: request.appointmentType,
      dateAccomplished: request.history.dateAccomplished,
      historyId: request.history.id,
    }));
    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching appointment schedules:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve appointment schedules." });
  }
};

exports.getPostAppointmentDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const postAppointmentDetail = await prisma.history.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        appointmentRequestId: true,
        dateAccomplished: true,
        proceduresPerformed: true,
        petConditionAfter: true,
        recommendationsForOwner: true,
        veterinariansNotes: true,
      },
    });

    if (!postAppointmentDetail) {
      return res
        .status(404)
        .json({ message: "Post-Appointment Detail not found" });
    }

    res.status(200).json(postAppointmentDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editPostAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      proceduresPerformed,
      petConditionAfter,
      recommendationsForOwner,
      veterinariansNotes,
    } = req.body;

    const updatedHistory = await prisma.history.update({
      where: { id: parseInt(id) },
      data: {
        proceduresPerformed,
        petConditionAfter,
        recommendationsForOwner,
        veterinariansNotes,
      },
    });

    res.status(200).json(updatedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePostAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHistory = await prisma.history.delete({
      where: { id: parseInt(id) },
    });

    res
      .status(200)
      .json({ message: "Post-Appointment Detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await prisma.history.findMany({
      select: {
        id: true,
        paymentDate: true,
        ownerId: true,
        paymentMethod: true,
        amount: true,
        appointmentRequest: {
          select: {
            assignedVet: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentHistory = await prisma.history.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        paymentDate: true,
        paymentMethod: true,
        amount: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            contactNo: true,
          },
        },
      },
    });

    if (!paymentHistory) {
      return res.status(404).json({ message: "Payment History not found" });
    }

    res.status(200).json(paymentHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editPaymentHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentDate, paymentMethod, amount } = req.body;

    const updatedPaymentHistory = await prisma.history.update({
      where: { id: parseInt(id) },
      data: {
        paymentDate,
        paymentMethod,
        amount,
      },
    });

    res.status(200).json(updatedPaymentHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePaymentHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPaymentHistory = await prisma.history.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Payment History deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStaffRemarksById = async (req, res) => {
  const { id } = req.params;

  try {
    const history = await prisma.history.findUnique({
      where: { id: Number(id) },
      select: {
        dateAccomplished: true,
        proceduresPerformed: true,
        petConditionAfter: true,
        recommendationsForOwner: true,
        veterinariansNotes: true,
        appointmentRequest: {
          select: {
            assignedVet: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    const staffRemarks = {
      ...history,
      assignedVet: history.appointmentRequest?.assignedVet
        ? `${history.appointmentRequest.assignedVet.firstName} ${history.appointmentRequest.assignedVet.lastName}`
        : "Not assigned",
    };

    res.status(200).json(staffRemarks);
  } catch (error) {
    console.error("Error fetching staff remarks:", error);
    res.status(500).json({ error: "Failed to retrieve staff remarks." });
  }
};
