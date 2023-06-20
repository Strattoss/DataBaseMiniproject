const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "buildingNumber must be an integer.",
    },
    min: 1,
  },
  apartmentNumber: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "apartmentNumber must be an integer.",
    },
  },
});

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  reservations : {
    type: [{
      reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
      },
      tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
      }
    }],
    required: false
  }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;