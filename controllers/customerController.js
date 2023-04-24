const Customer = require("../models/customer");

const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.status(200).json(customer);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedCustomer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.status(200).json(updatedCustomer);
      }
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
