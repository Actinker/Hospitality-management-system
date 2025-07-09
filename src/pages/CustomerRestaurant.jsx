import { useState } from 'react';
import MenuList from './MenuList';
import PropTypes from 'prop-types';

const CustomerRestaurant = ({ menuItems }) => {
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleOrderSubmit = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    if (order.length === 0) {
      alert('Please add items to your order');
      return;
    }

    try {
      await fetch('https://your-api-url.com/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, paymentMethod }),
      });
      alert('Order submitted successfully!');
      setOrder([]);
      setPaymentMethod('');
      setShowOrderSummary(false);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert('Failed to submit order. Please try again.');
    }
  };

  const addToOrder = (item) => {
    setOrder([...order, item]);
    setShowOrderSummary(true);
  };

  const removeFromOrder = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
    if (newOrder.length === 0) {
      setShowOrderSummary(false);
    }
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
        {order.length > 0 && (
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            {showOrderSummary ? 'Hide Order' : 'Show Order'} ({order.length} items)
          </button>
        )}
      </div>

      {showOrderSummary && order.length > 0 && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {order.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromOrder(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 font-bold">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <button
            onClick={handleOrderSubmit}
            className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Place Order
          </button>
        </div>
      )}

      <MenuList menuItems={menuItems} onAddToOrder={addToOrder} />
    </div>
  );
};

CustomerRestaurant.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      food_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default CustomerRestaurant;
