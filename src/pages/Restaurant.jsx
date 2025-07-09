// src/pages/Restaurant.jsx
import { useEffect, useState } from 'react';
import AdminRestaurant from './AdminRestaurant';
import CustomerRestaurant from './CustomerRestaurant';
import OrderList from './OrderList';
import BASE_URL from '../config';

const Restaurant = () => {
  const userRole = 'admin'; // Options: 'admin' or 'customer'

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminView, setAdminView] = useState('orders'); // "orders" or "menu"

  // Fetch available restaurants on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/restaurant/restaurant_id`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setRestaurants(data);
        if (data.length > 0) setSelectedRestaurant(data[0].rest_id);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch menu and details based on selected restaurant
  useEffect(() => {
    if (!selectedRestaurant) return;

    const fetchRestaurantDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/restaurant/fetch_selected_restaurant`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rest_id: selectedRestaurant })
        });
        const data = await response.json();
        setMenuItems(data.menu_details || []);
        setFilteredMenu(data.menu_details || []);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [selectedRestaurant]);

  // Filter menu based on search query
  useEffect(() => {
    setFilteredMenu(
      menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, menuItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">Restaurant Management</h1>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <select
                value={selectedRestaurant || ''}
                onChange={(e) => setSelectedRestaurant(parseInt(e.target.value))}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {restaurants.map((restaurant) => (
                  <option key={restaurant.rest_id} value={restaurant.rest_id}>
                    Restaurant {restaurant.rest_id}
                  </option>
                ))}
              </select>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userRole === 'admin' && (
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setAdminView('orders')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  adminView === 'orders'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                View Orders
              </button>
              <button
                onClick={() => setAdminView('menu')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  adminView === 'menu'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Edit Menu
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {userRole === 'admin' ? (
            adminView === 'orders' ? (
              <OrderList selectedRestaurant={selectedRestaurant} />
            ) : (
              <AdminRestaurant menuItems={filteredMenu} setMenuItems={setMenuItems} />
            )
          ) : (
            <CustomerRestaurant menuItems={filteredMenu} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Restaurant;
