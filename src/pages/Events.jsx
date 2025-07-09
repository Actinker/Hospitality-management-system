// src/pages/Events.jsx
import { useState, useEffect } from 'react';
import BASE_URL from '../config';

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      status === "Scheduled"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/reseption/event_todays`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result.content) {
        setEvents(result.data || []);
      } else {
        setError("Failed to fetch events.");
      }
    } catch (err) {
      setError("Error fetching events.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Modify event status
  const modifyEventStatus = async (eventId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reseption/event_status_modify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId, status: newStatus }),
      });
      const result = await response.json();
      setEvents(result);
    } catch (err) {
      setError("Error modifying event status.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render each event row with dynamic colors
  const renderEventRow = (event) => (
    <tr
      key={event.event_id}
      className="border-b hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="p-4 text-gray-700">{event.event_name}</td>
      <td className="p-4 text-gray-600">{event.description}</td>
      <td className="p-4 text-gray-700">{new Date(event.event_date).toLocaleDateString()}</td>
      <td className="p-4 text-gray-700">{new Date(event.insert_date).toLocaleDateString()}</td>
      <td className="p-4">
        <StatusBadge status={event.status} />
      </td>
      <td className="p-4">
        {event.status !== "Over" && (
          <button
            onClick={() => modifyEventStatus(event.event_id, "Over")}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Mark as Over
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Today&apos;s Events</h2>
        <button
          onClick={fetchEvents}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Refresh Events
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insert Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(renderEventRow)
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    {searchTerm ? "No events match your search" : "No events available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
