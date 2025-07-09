// src/pages/Staff.jsx
import { useState } from 'react';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const FormField = ({ label, name, type, value, onChange, required = true, tooltip = '' }) => (
  <div className="mb-4 group relative">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {tooltip && (
        <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
          ℹ️
        </span>
      )}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={`Enter ${label.toLowerCase()}`}
      required={required}
    />
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
};

const FormSection = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg mb-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Staff() {
  const [activeTab, setActiveTab] = useState('add');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: '',
    userid: '',
    job_title: '',
    phone_no: '',
    salary: '',
    job_type: '',
    contract_start: '',
    contract_end: '',
    address: '',
    join_date: '',
    age: '',
    id_type: '',
    id_number: '',
    nationality: '',
    DOB: '',
    alter_phone_no: '',
    bank_name: '',
    isfe: '',
    account_no: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const [modificationDetails, setModificationDetails] = useState({
    userid: '',
    what_to_modify: '',
    modification_value: '',
  });
  const [deleteUserid, setDeleteUserid] = useState('');

  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleModifyChange = (e) => {
    setModificationDetails({ ...modificationDetails, [e.target.name]: e.target.value });
  };

  const handleDeleteChange = (e) => {
    setDeleteUserid(e.target.value);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const validateForm = (formData) => {
    const errors = [];
    if (formData.phone_no && !/^\d{10}$/.test(formData.phone_no)) {
      errors.push('Phone number must be 10 digits');
    }
    if (formData.alter_phone_no && !/^\d{10}$/.test(formData.alter_phone_no)) {
      errors.push('Alternate phone number must be 10 digits');
    }
    if (formData.age && (formData.age < 18 || formData.age > 65)) {
      errors.push('Age must be between 18 and 65');
    }
    if (formData.salary && formData.salary < 0) {
      errors.push('Salary cannot be negative');
    }
    return errors;
  };

  // Add new staff member
  const handleAdd = async (e) => {
    e.preventDefault();
    const errors = validateForm(newStaff);
    if (errors.length > 0) {
      showMessage(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/authority/insert_employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
      if (!response.ok) throw new Error('Failed to add staff member');
      await response.json();
      showMessage('Staff member added successfully.', 'success');
      setNewStaff({
        username: '',
        userid: '',
        job_title: '',
        phone_no: '',
        salary: '',
        job_type: '',
        contract_start: '',
        contract_end: '',
        address: '',
        join_date: '',
        age: '',
        id_type: '',
        id_number: '',
        nationality: '',
        DOB: '',
        alter_phone_no: '',
        bank_name: '',
        isfe: '',
        account_no: ''
      });
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Modify an existing staff member
  const handleModify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { userid, what_to_modify, modification_value } = modificationDetails;
    try {
      const response = await fetch(`${BASE_URL}/authority/modify_employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, what_to_modify, modification_value }),
      });
      if (!response.ok) throw new Error('Failed to modify staff member');
      const result = await response.json();
      showMessage(
        result.status === 'Modified' ? 'Staff member modified successfully.' : 'Error modifying staff member.',
        result.status === 'Modified' ? 'success' : 'error'
      );
      setModificationDetails({ userid: '', what_to_modify: '', modification_value: '' });
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a staff member
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/authority/delete_employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: deleteUserid }),
      });
      if (!response.ok) throw new Error('Failed to delete staff member');
      const result = await response.json();
      showMessage(
        result.status === 'Deleted' ? 'Staff member deleted successfully.' : 'Error deleting staff member.',
        result.status === 'Deleted' ? 'success' : 'error'
      );
      setDeleteUserid('');
      setShowDeleteConfirm(false);
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
              <button
                onClick={() => navigate('/employee-list')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Employee List
              </button>
            </div>
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

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['add', 'modify', 'delete'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Staff
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {isLoading && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            {activeTab === 'add' && (
              <form onSubmit={handleAdd} className="space-y-6">
                <FormSection title="Personal Information">
                  <FormField
                    label="Name"
                    name="username"
                    type="text"
                    value={newStaff.username}
                    onChange={handleChange}
                    tooltip="Enter the full name of the staff member"
                  />
                  <FormField
                    label="User ID"
                    name="userid"
                    type="text"
                    value={newStaff.userid}
                    onChange={handleChange}
                    tooltip="Unique identifier for the staff member"
                  />
                  <FormField
                    label="Date of Birth"
                    name="DOB"
                    type="date"
                    value={newStaff.DOB}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Age"
                    name="age"
                    type="number"
                    value={newStaff.age}
                    onChange={handleChange}
                    tooltip="Must be between 18 and 65"
                  />
                  <FormField
                    label="Nationality"
                    name="nationality"
                    type="text"
                    value={newStaff.nationality}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Address"
                    name="address"
                    type="text"
                    value={newStaff.address}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection title="Contact Information">
                  <FormField
                    label="Phone No"
                    name="phone_no"
                    type="tel"
                    value={newStaff.phone_no}
                    onChange={handleChange}
                    tooltip="Must be 10 digits"
                  />
                  <FormField
                    label="Alternate Phone No"
                    name="alter_phone_no"
                    type="tel"
                    value={newStaff.alter_phone_no}
                    onChange={handleChange}
                    tooltip="Must be 10 digits"
                  />
                </FormSection>

                <FormSection title="Employment Details">
                  <FormField
                    label="Job Title"
                    name="job_title"
                    type="text"
                    value={newStaff.job_title}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Job Type"
                    name="job_type"
                    type="text"
                    value={newStaff.job_type}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Salary"
                    name="salary"
                    type="number"
                    value={newStaff.salary}
                    onChange={handleChange}
                    tooltip="Enter the annual salary"
                  />
                  <FormField
                    label="Join Date"
                    name="join_date"
                    type="date"
                    value={newStaff.join_date}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Contract Start"
                    name="contract_start"
                    type="date"
                    value={newStaff.contract_start}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Contract End"
                    name="contract_end"
                    type="date"
                    value={newStaff.contract_end}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection title="Identification">
                  <FormField
                    label="ID Type"
                    name="id_type"
                    type="text"
                    value={newStaff.id_type}
                    onChange={handleChange}
                  />
                  <FormField
                    label="ID Number"
                    name="id_number"
                    type="text"
                    value={newStaff.id_number}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection title="Bank Details">
                  <FormField
                    label="Bank Name"
                    name="bank_name"
                    type="text"
                    value={newStaff.bank_name}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Account No"
                    name="account_no"
                    type="text"
                    value={newStaff.account_no}
                    onChange={handleChange}
                  />
                  <FormField
                    label="ISFE"
                    name="isfe"
                    type="text"
                    value={newStaff.isfe}
                    onChange={handleChange}
                    tooltip="International Standard Financial Entity code"
                  />
                </FormSection>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Adding...' : 'Add Staff Member'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'modify' && (
              <form onSubmit={handleModify} className="max-w-lg mx-auto space-y-6">
                <FormField
                  label="User ID"
                  name="userid"
                  type="text"
                  value={modificationDetails.userid}
                  onChange={handleModifyChange}
                  tooltip="Enter the ID of the staff member to modify"
                />
                <FormField
                  label="Field to Modify"
                  name="what_to_modify"
                  type="text"
                  value={modificationDetails.what_to_modify}
                  onChange={handleModifyChange}
                  tooltip="Enter the field name you want to modify"
                />
                <FormField
                  label="New Value"
                  name="modification_value"
                  type="text"
                  value={modificationDetails.modification_value}
                  onChange={handleModifyChange}
                  tooltip="Enter the new value for the field"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Modifying...' : 'Modify Staff Member'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'delete' && (
              <form onSubmit={handleDelete} className="max-w-lg mx-auto space-y-6">
                <FormField
                  label="User ID"
                  name="deleteUserid"
                  type="text"
                  value={deleteUserid}
                  onChange={handleDeleteChange}
                  tooltip="Enter the ID of the staff member to delete"
                />
                {showDeleteConfirm && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Are you sure you want to delete this staff member? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-4">
                  {showDeleteConfirm && (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Deleting...' : showDeleteConfirm ? 'Confirm Delete' : 'Delete Staff Member'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
