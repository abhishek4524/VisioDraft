import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Community = ({ token }) => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/community/list`);
        if (response.data.success) {
          setCommunities(response.data.communities || []);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to fetch communities");
      } finally {
        setLoading(false);
      }
    };
  
    const deleteCommunity = async (communityId) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/community/delete`,
          { id: communityId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setCommunities(communities.filter(community => community._id !== communityId));
          setShowDeleteModal(false);
          setSelectedCommunity(null);
        }
      } catch (error) {
        console.error("Error deleting community:", error);
        setError("Failed to delete community");
      }
    };
  
    useEffect(() => {
      fetchCommunities();
    }, []);
  
    // Filter communities based on selected filter and search term
    const filteredCommunities = communities.filter(community => {
      const matchesFilter = filter === "all" || community.status === filter;
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (community.topic && community.topic.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  
    const approveCommunity = async (communityId) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/community/approve`,
          { id: communityId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setCommunities(communities.map(community => 
            community._id === communityId ? { ...community, status: "approved" } : community
          ));
        }
      } catch (error) {
        console.error("Error approving community:", error);
        setError("Failed to approve community");
      }
    };
  
    const rejectCommunity = async (communityId) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/community/reject`,
          { id: communityId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setCommunities(communities.map(community => 
            community._id === communityId ? { ...community, status: "rejected" } : community
          ));
        }
      } catch (error) {
        console.error("Error rejecting community:", error);
        setError("Failed to reject community");
      }
    };

  return (
    <div>
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Community Management</h1>
        <p className="text-gray-600 mt-1">Manage all communities in this system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{communities.length}</h2>
              <p className="text-sm text-gray-600">Total Communities</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{communities.filter(community => community.status === "approved").length}</h2>
              <p className="text-sm text-gray-600">Approved Communities</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-2 mr-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{communities.filter(community => community.status === "pending").length}</h2>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-2 mr-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{new Set(communities.map(community => community.createdBy?._id)).size}</h2>
              <p className="text-sm text-gray-600">Community Creators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilter('all')}
            >
              All Communities
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilter('approved')}
            >
              Approved
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search communities..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Communities List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCommunities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Community Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category & Members
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCommunities.map((community) => (
                  <tr key={community._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{community.name}</div>
                        <div className="text-sm text-gray-500">{community.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(community.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{community.topic}</div>
                      <div className="text-sm text-gray-500">{community.joinedUsers?.length || 0} members</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{community.uploadedBy?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{community.uploadedBy?.email || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${community.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          community.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {community.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={`/community/${community._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </a>
                      {community.status === "pending" && (
                        <>
                          <button 
                            className="text-green-600 hover:text-green-900 mr-4"
                            onClick={() => approveCommunity(community._id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 mr-4"
                            onClick={() => rejectCommunity(community._id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          setSelectedCommunity(community);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No communities found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? "Try adjusting your search or filter" : "No communities have been created yet."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete the community <span className="font-semibold">"{selectedCommunity?.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => deleteCommunity(selectedCommunity._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Community