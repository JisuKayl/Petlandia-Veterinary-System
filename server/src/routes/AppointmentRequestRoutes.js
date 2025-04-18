const express = require("express");
const appointmentRequestController = require("../controllers/AppointmentRequestsController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get(
  "/staff-availability",
  authenticate,
  appointmentRequestController.checkVetAvailability
);
router.post(
  "/",
  authenticate,
  appointmentRequestController.createAppointmentRequest
);
router.get(
  "/",
  authenticate,
  appointmentRequestController.getAllAppointmentRequests
);
router.get(
  "/:id",
  authenticate,
  appointmentRequestController.getAppointmentRequestDetails
);
router.put(
  "/:id/accept",
  authenticate,
  appointmentRequestController.acceptAppointmentRequest
);
router.put(
  "/:id/decline",
  authenticate,
  appointmentRequestController.declineAppointmentRequest
);
router.put(
  "/:id",
  authenticate,
  appointmentRequestController.editAppointmentRequest
);
router.delete(
  "/:id",
  authenticate,
  appointmentRequestController.deleteAppointmentRequest
);

router.put(
  "/:id/reschedule",
  authenticate,
  appointmentRequestController.rescheduleAppointmentRequest
);

module.exports = router;
