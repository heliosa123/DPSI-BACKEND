// routes/suppliers.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');
const { authenticate, authorize } = require('../middleware/auth');

// Get all suppliers
router.get('/', authenticate, async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single supplier by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new supplier
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a supplier by ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    await supplier.update(req.body);
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a supplier by ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    await supplier.destroy();
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
