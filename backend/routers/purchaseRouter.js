const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const router = express.Router();

// router.get("/", purchaseController.getAllReviews);
router.get("/:id", purchaseController.getCustomerPurchases);
// router.post("/", purchaseController.createReview);
 router.put("/", purchaseController.buyReservation);
// router.delete("/:id", purchaseController.deleteReview);

module.exports = router;