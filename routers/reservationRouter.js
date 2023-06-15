const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getCustomerReservation);
router.post("/", reservationController.createReservation);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
