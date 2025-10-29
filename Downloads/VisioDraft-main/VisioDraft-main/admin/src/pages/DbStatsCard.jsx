import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

function DbStatsCard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${backendUrl}/api/user/db-stats`);
        console.log("DB Stats Response:", res.data);
        setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching DB stats:", err);
        setError(err.response?.data?.message || "Failed to fetch database statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  if (loading) return <p className="p-4 text-gray-600">Loading database statistics...</p>;
  
  if (error) return (
    <div className="p-4 shadow rounded bg-red-50 border border-red-200">
      <h2 className="text-lg font-bold mb-2 text-red-800">Database Statistics Error</h2>
      <p className="text-red-600">{error}</p>
    </div>
  );

  if (!stats) return (
    <div className="p-4 shadow rounded bg-yellow-50 border border-yellow-200">
      <p className="text-yellow-800">No statistics data available</p>
    </div>
  );

  const storagePercentage = stats.storageSize > 0 
    ? ((stats.dataSize / stats.storageSize) * 100).toFixed(1)
    : 0;

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Database Usage Statistics</h2>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Used Storage</p>
          <p className="text-lg font-semibold text-blue-600">{formatBytes(stats.dataSize)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Total Allocated Storage</p>
          <p className="text-lg font-semibold text-green-600">{formatBytes(stats.storageSize)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Index Size</p>
          <p className="text-lg font-semibold text-purple-600">{formatBytes(stats.indexSize)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Storage Utilization</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${storagePercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{storagePercentage}% utilized</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Collections</p>
          <p className="text-lg font-semibold text-orange-600">{stats.collections || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default DbStatsCard;