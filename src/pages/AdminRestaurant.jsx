// src/pages/AdminRestaurant.jsx
import { useState } from 'react';
import MenuList from './MenuList';
import BASE_URL from '../config';
import PropTypes from 'prop-types';

const AdminRestaurant = ({ menuItems, setMenuItems }) => {
  const [activeTab, setActiveTab] = useState('add');
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    avg_income_rate: '',
    avg_plate_cost: '',
    isVeg: '1',
    type: '',
    rest_id: '1',
    food_id: ''
  });

  const [modification, setModification] = useState({
    food_id: '',
    what_to_modify: 'price',
    modification_value: '',
  });

  const addMenuItem = async () => {
    const formattedItem = {
      ...newItem,
      price: parseFloat(newItem.price) || 0,
      avg_income_rate: parseFloat(newItem.avg_income_rate) || 0,
      avg_plate_cost: parseFloat(newItem.avg_plate_cost) || 0,
      isVeg: parseInt(newItem.isVeg, 10),
      rest_id: parseInt(newItem.rest_id, 10),
    };
  
    try {
      const response = await fetch(`${BASE_URL}/authority/insert_food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedItem),
      });
      const data = await response.json();
      if (data.status === "Inserted") {
        const newFoodItem = data.body[0];
        setMenuItems([...menuItems, newFoodItem]);
        setNewItem({
          name: '',
          price: '',
          description: '',
          avg_income_rate: '',
          avg_plate_cost: '',
          isVeg: '1',
          type: '',
          rest_id: '1'
        });
      } else {
        console.error("Failed to insert item:", data);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await fetch(`${BASE_URL}/authority/delete_food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_id: id }),
      });
      setMenuItems(menuItems.filter(item => item.food_id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const modifyMenuItem = async () => {
    const formattedModification = {
      ...modification,
      modification_value: parseFloat(modification.new_value) || 0,
      food_id: parseInt(modification.food_id, 10),
    };

    try {
      const response = await fetch(`${BASE_URL}/authority/modify_food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedModification),
      });
      const data = await response.json();
      if (data.status === "Modified") {
        setMenuItems(menuItems.map(item => 
          item.food_id === formattedModification.food_id 
            ? { ...item, [formattedModification.what_to_modify]: formattedModification.modification_value } 
            : item
        ));
        setModification({
          food_id: '',
          what_to_modify: 'price',
          modification_value: '',
        });
      } else {
        console.error("Failed to modify item:", data);
      }
    } catch (error) {
      console.error("Error modifying menu item:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
          <p className="mt-1 text-sm text-gray-600">Add, modify, or remove menu items</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'add'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Add Menu Item
            </button>
            <button
              onClick={() => setActiveTab('modify')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'modify'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Modify Menu Item
            </button>
          </nav>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Current Menu Items */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Menu Items</h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <MenuList menuItems={menuItems} onDelete={deleteMenuItem} />
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            {activeTab === 'add' ? (
              <form onSubmit={(e) => { e.preventDefault(); addMenuItem(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Average Income Rate</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.avg_income_rate}
                      onChange={(e) => setNewItem({ ...newItem, avg_income_rate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Average Plate Cost</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.avg_plate_cost}
                      onChange={(e) => setNewItem({ ...newItem, avg_plate_cost: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Veg/Non-Veg</label>
                    <select
                      value={newItem.isVeg}
                      onChange={(e) => setNewItem({ ...newItem, isVeg: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="1">Vegetarian</option>
                      <option value="0">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Menu Item
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); modifyMenuItem(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Food ID</label>
                    <input
                      type="number"
                      value={modification.food_id}
                      onChange={(e) => setModification({ ...modification, food_id: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Field to Modify</label>
                    <select
                      value={modification.what_to_modify}
                      onChange={(e) => setModification({ ...modification, what_to_modify: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="price">Price</option>
                      <option value="avg_income_rate">Average Income Rate</option>
                      <option value="avg_plate_cost">Average Plate Cost</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Value</label>
                    <input
                      type="number"
                      step="0.01"
                      value={modification.modification_value}
                      onChange={(e) => setModification({ ...modification, modification_value: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Modify Menu Item
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AdminRestaurant.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      food_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      avg_income_rate: PropTypes.number,
      avg_plate_cost: PropTypes.number,
      isVeg: PropTypes.number,
      type: PropTypes.string,
    })
  ).isRequired,
  setMenuItems: PropTypes.func.isRequired,
};

export default AdminRestaurant;
