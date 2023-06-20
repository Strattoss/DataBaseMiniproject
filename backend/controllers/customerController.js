const Customer = require("../models/customer");

const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.find().select('email firstName lastName username phoneNumber reservations').lean()
      const result = customers.map(c => {
        const { reservations, ...rest } = c
        return {
          numberOfReservations: reservations === undefined ? 0 : reservations.length,
          ...rest
        }
      })
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { reservations, ...rest } = await Customer.findById(req.params.id).lean()
      const result =  {
          numberOfReservations: reservations === undefined ? 0 : reservations.length,
          reservations: reservations === undefined ? [] : reservations,
          ...rest
        }
      if (!result) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const { country, city, street, postalCode, buildingNumber, apartmentNumber, ...rest } = req.body
      const data = {
        ...rest,
        address : {
          country: country,
          city: city,
          street: street,
          postalCode: postalCode,
          buildingNumber: buildingNumber,
          apartmentNumber: apartmentNumber
        }
      }
      
      const customer = new Customer(data);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
      if (!deletedCustomer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.status(200).json({ message: "Customer deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = customerController;
