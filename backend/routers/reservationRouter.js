const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.get("/:id", reservationController.getCustomerReservations);
router.get("/cancelled/:id", reservationController.getCustomerCancelledReservations);
router.post("/", reservationController.createReservation);
router.post("/review", reservationController.createReview);
router.put("/", reservationController.resignReservation);


module.exports = router;
