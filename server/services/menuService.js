const MenuItem = require('../models/mongodb/menuItem');

const menuService = {
    async getAllMenuItems() {
        try {
            const menuItems = await MenuItem.find();
            return menuItems;
        } catch (error) {
            throw new Error('Error fetching menu items: ' + error.message);
        }
    },

    async getMenuItemById(id) {
        try {
            const menuItem = await MenuItem.findById(id);
            if (!menuItem) {
                throw new Error('Menu item not found');
            }
            return menuItem;
        } catch (error) {
            throw new Error('Error fetching menu item: ' + error.message);
        }
    },

    async createMenuItem(menuItemData) {
        try {
            const newMenuItem = new MenuItem(menuItemData);
            await newMenuItem.save();
            return newMenuItem;
        } catch (error) {
            throw new Error('Error creating menu item: ' + error.message);
        }
    },

    async updateMenuItem(id, menuItemData) {
        try {
            const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, menuItemData, { new: true });
            if (!updatedMenuItem) {
                throw new Error('Menu item not found');
            }
            return updatedMenuItem;
        } catch (error) {
            throw new Error('Error updating menu item: ' + error.message);
        }
    },

    async deleteMenuItem(id) {
        try {
            const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
            if (!deletedMenuItem) {
                throw new Error('Menu item not found');
            }
            return deletedMenuItem;
        } catch (error) {
            throw new Error('Error deleting menu item: ' + error.message);
        }
    }
};

module.exports = menuService;