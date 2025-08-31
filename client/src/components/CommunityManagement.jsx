// components/CommunityManagement.jsx
import React, { useState } from "react";
import { Edit, Trash2, Settings } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import { useToast } from "./Toast";

const CommunityManagement = ({ community, isCreator, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: community.name,
    description: community.description,
    topic: community.topic,
    icon: community.icon
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backendUrl}/api/community/${community._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        onUpdate(response.data.community);
        setIsEditing(false);
        showToast("Community updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating community:", error);
      showToast(error.response?.data?.message || "Failed to update community", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this community? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendUrl}/api/community/${community._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        onDelete(community._id);
        showToast("Community deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
      showToast(error.response?.data?.message || "Failed to delete community", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isCreator) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700"
      >
        <Settings className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={() => {
              setIsEditing(true);
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Community
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isLoading ? "Deleting..." : "Delete Community"}
          </button>
        </div>
      )}
      
      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Community</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Community Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Education">Education</option>
                  <option value="Health & Medicine">Health & Medicine</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityManagement;