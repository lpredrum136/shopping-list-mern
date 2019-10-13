const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Item Model
const Item = require('../../models/Item');

// @route GET /api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error(error.message);
  }
});

// @route POST /api/items
// @desc Create an item
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name
    });

    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error.message);
  }
});

// @route DELETE /api/items/:id
// @desc Delete an item
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    await item.remove();
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false });
  }
});

module.exports = router;
