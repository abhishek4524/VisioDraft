// controllers/adminController.js
import mongoose from "mongoose";

export const getDbStats = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database not connected"
      });
    }

    const stats = await db.stats();
    
    // Get collection details
    const collections = await db.listCollections().toArray();
    const collectionDetails = await Promise.all(
      collections.map(async (collection) => {
        const collStats = await db.collection(collection.name).stats();
        return {
          name: collection.name,
          size: collStats.size || 0,
          count: collStats.count || 0,
          storageSize: collStats.storageSize || 0,
          indexSize: collStats.totalIndexSize || 0
        };
      })
    );

    // Sort collections by size (descending)
    collectionDetails.sort((a, b) => b.size - a.size);

    res.json({
      success: true,
      data: {
        dataSize: stats.dataSize || 0,
        storageSize: stats.storageSize || 0,
        indexSize: stats.indexSize || 0,
        collections: stats.collections || 0,
        objects: stats.objects || 0,
        avgObjSize: stats.avgObjSize || 0,
        fileSize: stats.fileSize || 0,
        collectionDetails
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Database stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching database statistics",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};