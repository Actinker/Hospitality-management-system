// src/pages/Rooms.jsx
import { useState } from 'react';
import BASE_URL from '../config';
import PropTypes from 'prop-types';

const FormField = ({ label, name, type, value, onChange, required = true, tooltip = '', min, options = [] }) => (
  <div className="mb-4 group relative">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {tooltip && (
        <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
          ℹ️
        </span>
      )}
    </label>
    {type === 'select' ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
        required={required}
      />
    )}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  min: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

const FormSection = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg mb-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Rooms() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    customer_name: '',
    phone_no: '',
    id_type: '',
    id_number: '',
    room_id: '',
    room_type: '',
    checkin: '',
    checkout: '',
    price_total: '',
    discount_applied: false,
    coupon_id: '',
    gmail_id: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const validateForm = () => {
    const errors = [];
    if (!bookingData.customer_name || !bookingData.phone_no || !bookingData.id_type || 
        !bookingData.id_number || !bookingData.room_type || !bookingData.checkin || 
        !bookingData.checkout || !bookingData.price_total || !bookingData.gmail_id) {
      errors.push('Please fill in all required fields');
    }
    if (new Date(bookingData.checkout) <= new Date(bookingData.checkin)) {
      errors.push('Check-out date must be after check-in date');
    }
    if (bookingData.phone_no && !/^\d{10}$/.test(bookingData.phone_no)) {
      errors.push('Phone number must be 10 digits');
    }
    if (bookingData.gmail_id && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.gmail_id)) {
      errors.push('Please enter a valid email address');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      showMessage(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reseption/room_booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error('Failed to book room');
      await response.json();
      showMessage('Room booked successfully!', 'success');
      setBookingData({
        customer_name: '',
        phone_no: '',
        id_type: '',
        id_number: '',
        room_id: '',
        room_type: '',
        checkin: '',
        checkout: '',
        price_total: '',
        discount_applied: false,
        coupon_id: '',
        gmail_id: '',
      });
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Room Booking</h2>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`p-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.type === 'success' ? (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-6">
            {isLoading && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormSection title="Customer Information">
                <FormField
                  label="Customer Name"
                  name="customer_name"
                  type="text"
                  value={bookingData.customer_name}
                  onChange={handleChange}
                  tooltip="Enter the full name of the customer"
                />
                <FormField
                  label="Phone Number"
                  name="phone_no"
                  type="tel"
                  value={bookingData.phone_no}
                  onChange={handleChange}
                  tooltip="Must be 10 digits"
                />
                <FormField
                  label="Email ID"
                  name="gmail_id"
                  type="email"
                  value={bookingData.gmail_id}
                  onChange={handleChange}
                  tooltip="Enter a valid email address"
                />
                <FormField
                  label="ID Type"
                  name="id_type"
                  type="text"
                  value={bookingData.id_type}
                  onChange={handleChange}
                />
                <FormField
                  label="ID Number"
                  name="id_number"
                  type="text"
                  value={bookingData.id_number}
                  onChange={handleChange}
                />
              </FormSection>

              <FormSection title="Room Details">
                <FormField
                  label="Room Type"
                  name="room_type"
                  type="select"
                  value={bookingData.room_type}
                  onChange={handleChange}
                  options={['S1', 'S4', 'S5']}
                  tooltip="Select the type of room"
                />
                <FormField
                  label="Room ID"
                  name="room_id"
                  type="text"
                  value={bookingData.room_id}
                  onChange={handleChange}
                />
                <FormField
                  label="Check-In Date"
                  name="checkin"
                  type="date"
                  value={bookingData.checkin}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <FormField
                  label="Check-Out Date"
                  name="checkout"
                  type="date"
                  value={bookingData.checkout}
                  onChange={handleChange}
                  min={bookingData.checkin || new Date().toISOString().split('T')[0]}
                />
              </FormSection>

              <FormSection title="Payment Details">
                <FormField
                  label="Price Total"
                  name="price_total"
                  type="number"
                  value={bookingData.price_total}
                  onChange={handleChange}
                  tooltip="Enter the total price for the stay"
                />
                <div className="flex items-center space-x-2">
                  <input
                    id="discount_applied"
                    type="checkbox"
                    name="discount_applied"
                    checked={bookingData.discount_applied}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="discount_applied" className="text-sm font-medium text-gray-700">
                    Apply Discount
                  </label>
                </div>
                {bookingData.discount_applied && (
                  <FormField
                    label="Coupon ID"
                    name="coupon_id"
                    type="text"
                    value={bookingData.coupon_id}
                    onChange={handleChange}
                    required={false}
                  />
                )}
              </FormSection>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
