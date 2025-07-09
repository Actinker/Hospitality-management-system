// src/pages/Maintenance.jsx
import { useState, useEffect } from 'react';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

const Maintenance = () => {
  const [data, setData] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("maintenance");
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Fetch pending maintenance list
  const fetchPendingMaintenance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/maintenance/fetch_maintenace_pending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result.valid) {
        setData(result.pending_list || []);
      } else {
        setError("Failed to fetch pending maintenance data.");
      }
    } catch (err) {
      setError("Error fetching maintenance data.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requirements list
  const fetchRequirements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/maintenance/fetch_requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      setRequirements(result.fetched_data || []);
    } catch (err) {
      setError("Error fetching requirements.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load today's maintenance list
  const loadTodayMaintenance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/maintenance/load_today`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      fetchPendingMaintenance();
      setMessage({ text: "Today's maintenance tasks loaded successfully!", type: 'success' });
    } catch (err) {
      setError("Error loading today's maintenance.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Modify maintenance status to 'completed'
  const markAsCompleted = async (maintenanceId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/maintenance/modify_maintenance_pending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenance_id: maintenanceId, status: "completed" }),
      });
      const result = await response.json();
      if (result.valid) {
        setData(result.pending_list || []);
        setMessage({ text: 'Maintenance task marked as completed!', type: 'success' });
      } else {
        setError("Failed to modify maintenance status.");
      }
    } catch (err) {
      setError("Error modifying maintenance status.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const markRequirementAsCompleted = async (requirementId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/maintenance/modify_requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirement_id: requirementId, status: "completed" }),
      });
      const result = await response.json();
      if (result.status === "completed") {
        setRequirements(requirements.map(req => 
          req.requirement_id === requirementId ? { ...req, status: "completed" } : req
        ));
        setMessage({ text: 'Requirement marked as completed!', type: 'success' });
      } else {
        setError("Failed to modify requirement status.");
      }
    } catch (err) {
      setError("Error modifying requirement status.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "maintenance") {
      fetchPendingMaintenance();
    } else if (activeTab === "requirements") {
      fetchRequirements();
    }
  }, [activeTab]);

  const renderTableRow = (item) => (
    <tr key={item.maintenance_id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.maintenance_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.today_maintenance_date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.is_room ? `Room ${item.room_id}` : item.is_rest ? `Restaurant ${item.rest_id}` : item.common_area_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.status === 'pending' && (
          <button
            onClick={() => markAsCompleted(item.maintenance_id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mark as Completed
          </button>
        )}
      </td>
    </tr>
  );

  const renderRequirementsRow = (req) => (
    <tr key={req.requirement_id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {req.requirement_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {req.user_id || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {req.room_id || 'N/A'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {req.description || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={req.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {req.status === 'pending' && (
          <button
            onClick={() => markRequirementAsCompleted(req.requirement_id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mark as Completed
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-gray-800">Maintenance Management</h2>
              <div className="flex space-x-4">
                {activeTab === "maintenance" && (
                  <button
                    onClick={loadTodayMaintenance}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Load Today's Maintenance
                  </button>
                )}
                {activeTab === "requirements" && (
                  <button
                    onClick={() => navigate('/add-requirement')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Requirement
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`px-6 py-4 ${
              message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
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
                  <p className={`text-sm font-medium ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("maintenance")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "maintenance"
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Maintenance List
              </button>
              <button
                onClick={() => setActiveTab("requirements")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "requirements"
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Requirements List
              </button>
            </nav>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="px-6 py-4 bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Table Section */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {activeTab === "maintenance" ? (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </>
                    ) : (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeTab === "maintenance" ? (
                    data.length > 0 ? (
                      data.map(renderTableRow)
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No maintenance data available
                        </td>
                      </tr>
                    )
                  ) : requirements.length > 0 ? (
                    requirements.map(renderRequirementsRow)
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No requirements available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
