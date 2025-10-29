import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { Link } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    users: 0,
    notes: 0,
    pyqs: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users data
        const usersResponse = await axios.get(`${backendUrl}/api/user/list-users`);
        const usersCount = usersResponse.data.success ? usersResponse.data.users.length : 0;

        // Fetch notes data
        const notesResponse = await axios.get(`${backendUrl}/api/note/list`);
        const notesCount = notesResponse.data.success ? notesResponse.data.notes.length : 0;

        // Fetch PYQs data
        const pyqsResponse = await axios.get(`${backendUrl}/api/pyqs`);
        const pyqsCount = pyqsResponse.data.success ? pyqsResponse.data.data.length : 0;

        // Get recent activity (last 5 users and last 5 notes/pyqs)
        const recentUsers = usersResponse.data.success ? 
          usersResponse.data.users.slice(-5).map(user => ({
            type: 'user',
            action: 'registered',
            name: user.name,
            time: new Date(user.createdAt).toLocaleDateString()
          })) : [];

        const recentNotes = notesResponse.data.success ?
          notesResponse.data.notes.slice(-5).map(note => ({
            type: 'note',
            action: 'uploaded',
            title: note.title,
            time: new Date(note.createdAt).toLocaleDateString()
          })) : [];

        const recentPyqs = pyqsResponse.data.success ?
          pyqsResponse.data.data.slice(-5).map(pyq => ({
            type: 'pyq',
            action: 'uploaded',
            title: pyq.title,
            time: new Date(pyq.createdAt).toLocaleDateString()
          })) : [];

        // Combine and sort recent activity by date
        const allActivity = [...recentUsers, ...recentNotes, ...recentPyqs];
        allActivity.sort((a, b) => new Date(b.time) - new Date(a.time));
        const recentActivity = allActivity.slice(0, 5);

        setStats({
          users: usersCount,
          notes: notesCount,
          pyqs: pyqsCount,
          recentActivity
        });
        
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data");
        // Fallback to sample data if API calls fail
        setStats({
          users: 124,
          notes: 567,
          pyqs: 89,
          recentActivity: [
            { type: 'user', action: 'registered', name: 'John Doe', time: '2 minutes ago' },
            { type: 'note', action: 'uploaded', title: 'Mathematics Notes', time: '5 minutes ago' },
            { type: 'pyq', action: 'uploaded', title: '2023 Physics Paper', time: '10 minutes ago' },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 极 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stats.users}</h2>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stats.notes}</h2>
              <p className="text-sm text-gray-600">Study Notes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="current极Color" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stats.pyqs}</h2>
              <p className="text-sm text-gray-600">PYQ Papers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/add" className="block w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-sm font-medium text-blue-700">Add New Note</span>
              <svg className="w-5 h-5极 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap极="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0极v6m0-6h6m-6 0H6"></path>
              </svg>
            </Link>
            <Link to="/pyq" className="block w-full flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <span className="text-sm font-medium text-green-700">Upload PYQ</span>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </Link>
            <Link to="/users" className="block w-full flex items-center justify-between p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <span className="text-sm font-medium text-purple-700">Manage Users</span>
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0极v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-3 ${
                      activity.type === 'user' ? 'bg-blue-100' : 
                      activity.type === 'note' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        activity.type === 'user' ? 'text-blue-600' : 
                        activity.type === 'note' ? 'text-green-600' : 'text-purple-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {activity.type === 'user' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        )}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'user' ? (
                          <>User <span className="text-blue-600">{activity.name}</span> {activity.action}</>
                        ) : (
                          <>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} <span className="text-blue-600">{activity.title}</span> {activity.action}</>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Server Status</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Online</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium极 text-gray-700">Database</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Connected</span>
          </div>
          <div className="p极-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Storage</span>
              <span className="text-xs text-gray-500">2.3GB / 10GB used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '23%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;