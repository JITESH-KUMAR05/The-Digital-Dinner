const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET all menu items
// The error happens because menuController.getMenuItems is undefined
router.get('/', menuController.getMenuItems);

// GET a single menu item by ID
router.get('/:id', menuController.getMenuItemById);

// POST a new menu item
router.post('/', menuController.createMenuItem);

// PUT/update a menu item
router.put('/:id', menuController.updateMenuItem);

// DELETE a menu item
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;