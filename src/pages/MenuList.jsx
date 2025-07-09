import PropTypes from 'prop-types';

const MenuList = ({ menuItems, onAddToOrder, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {menuItems.map((item) => (
      <div
        key={item.food_id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">ID: {item.food_id}</p>
            </div>
            <span className="text-lg font-bold text-blue-600">${item.price}</span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          
          <div className="flex justify-between items-center">
            {onAddToOrder && (
              <button
                onClick={() => onAddToOrder(item)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Add to Order
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item.food_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      food_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onAddToOrder: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MenuList;
