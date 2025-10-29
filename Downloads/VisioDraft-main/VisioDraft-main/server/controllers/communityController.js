import Community from "../models/communityModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// Create a new community
export const createCommunity = async (req, res) => {
  try {
    const { name, description, topic, icon } = req.body;

    // Validation
    if (!name || !description || !topic) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and topic are required",
      });
    }

    // Check if community name already exists (case insensitive)
    const existingCommunity = await Community.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingCommunity) {
      return res.status(409).json({
        success: false,
        message: "Community name already exists",
      });
    }

    // Validate name length
    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Community name must be between 3 and 50 characters",
      });
    }

    // Validate description length
    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 10 and 500 characters",
      });
    }

    const community = await Community.create({
      name: name.trim(),
      description: description.trim(),
      topic,
      icon: icon || "👥", // Default icon
      uploadedBy: req.user._id,
      joinedUsers: [req.user._id], // Creator auto joins
      moderators: [req.user._id], // Creator becomes moderator
    });

    // Add community to user's joined communities
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { joinedCommunities: community._id } },
      { new: true }
    );

    // Populate the response
    const populatedCommunity = await Community.findById(community._id)
      .populate("uploadedBy", "name email")
      .populate("joinedUsers", "name email profilePic");

    res.status(201).json({
      success: true,
      message: "Community created successfully",
      community: populatedCommunity,
    });
  } catch (error) {
    console.error("Create community error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Subscribe (join) a community
export const subscribeToCommunity = async (req, res) => {
  try {
    const { communityId } = req.body;

    if (!communityId) {
      return res.status(400).json({
        success: false,
        message: "Community ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid community ID",
      });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    // Check if user is already a member
    if (community.joinedUsers.includes(req.user._id)) {
      return res.status(409).json({
        success: false,
        message: "You are already a member of this community",
      });
    }

    // Add user to community members
    community.joinedUsers.push(req.user._id);
    await community.save();

    // Add community to user's joined communities
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { joinedCommunities: community._id } },
      { new: true }
    );

    // Get updated community with populated users
    const updatedCommunity = await Community.findById(communityId)
      .populate("uploadedBy", "name email")
      .populate("joinedUsers", "name email profilePic");

    res.json({
      success: true,
      message: "Successfully joined the community",
      community: updatedCommunity,
      membersCount: updatedCommunity.joinedUsers.length,
    });
  } catch (error) {
    console.error("Subscribe to community error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Unsubscribe (leave) a community
export const unsubscribeFromCommunity = async (req, res) => {
  try {
    const { communityId } = req.body;

    if (!communityId) {
      return res.status(400).json({
        success: false,
        message: "Community ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid community ID",
      });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    // Check if user is the creator (prevent creator from leaving)
    if (community.uploadedBy.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Community creator cannot leave the community",
      });
    }

    // Check if user is a member
    if (!community.joinedUsers.includes(req.user._id)) {
      return res.status(409).json({
        success: false,
        message: "You are not a member of this community",
      });
    }

    // Remove user from community members
    community.joinedUsers = community.joinedUsers.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    // Remove user from moderators if they are one
    community.moderators = community.moderators.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await community.save();

    // Remove community from user's joined communities
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { joinedCommunities: community._id } },
      { new: true }
    );

    // Get updated community with populated users
    const updatedCommunity = await Community.findById(communityId)
      .populate("uploadedBy", "name email")
      .populate("joinedUsers", "name email profilePic");

    res.json({
      success: true,
      message: "Successfully left the community",
      community: updatedCommunity,
      membersCount: updatedCommunity.joinedUsers.length,
    });
  } catch (error) {
    console.error("Unsubscribe from community error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// View single community (with members and additional details)
export const viewCommunity = async (req, res) => {
  try {
    const { id } = req.params; // use params not query

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid community ID" });
    }

    const community = await Community.findById(id)
      .populate("uploadedBy", "name email profilePic")
      .populate("joinedUsers", "name email profilePic")
      .populate("moderators", "name email profilePic");

    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    const isMember = community.joinedUsers.some(
      (user) => user._id.toString() === req.user._id.toString()
    );

    const isModerator = community.moderators.some(
      (user) => user._id.toString() === req.user._id.toString()
    );

    res.json({
      success: true,
      community,
      userStatus: {
        isMember,
        isModerator,
        isCreator: community.uploadedBy._id.toString() === req.user._id.toString(),
      },
    });
  } catch (error) {
    console.error("View community error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// List all communities (with filtering, pagination, and sorting)
export const listCommunities = async (req, res) => {
  try {
    const { topic, search, page = 1, limit = 10, sort = "members" } = req.query;

    // Build filter object
    const filter = {};
    if (topic) filter.topic = topic;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    let sortOptions = {};
    switch (sort) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "members":
      default:
        sortOptions = { joinedUsers: -1 };
        break;
    }

    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        { path: "uploadedBy", select: "name profilePic" },
        { path: "joinedUsers", select: "name" },
      ],
      sort: sortOptions,
    };

    // Execute query with pagination
    const communities = await Community.paginate(filter, options);

    res.json({
      success: true,
      communities: communities.docs,
      pagination: {
        page: communities.page,
        totalPages: communities.totalPages,
        totalCommunities: communities.totalDocs,
        hasNext: communities.hasNextPage,
        hasPrev: communities.hasPrevPage,
      },
    });
  } catch (error) {
    console.error("List communities error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// List communities the user has joined
export const listJoinedCommunities = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "joinedCommunities",
        populate: [
          { path: "uploadedBy", select: "name email profilePic" },
          { path: "joinedUsers", select: "name" },
        ],
      })
      .select("joinedCommunities");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      communities: user.joinedCommunities,
      count: user.joinedCommunities.length,
    });
  } catch (error) {
    console.error("List joined communities error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get community statistics
export const getCommunityStats = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid community ID" });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    res.json({
      success: true,
      stats: {
        totalMembers: community.joinedUsers.length,
        createdAt: community.createdAt,
      },
    });
  } catch (error) {
    console.error("Get community stats error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Approve community
export const approveCommunity = async (req, res) => {
  try {
    const { id } = req.body;
    const community = await Community.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!community) return res.status(404).json({ success: false, message: "Community not found" });
    res.json({ success: true, community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error approving community" });
  }
};

// Reject community
export const rejectCommunity = async (req, res) => {
  try {
    const { id } = req.body;
    const community = await Community.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    if (!community) return res.status(404).json({ success: false, message: "Community not found" });
    res.json({ success: true, community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error rejecting community" });
  }
};



export const checkMembership = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid community ID" });
    }
    
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }
    
    const isMember = community.joinedUsers.some(
      userId => userId.toString() === req.user._id.toString()
    );
    
    res.json({ success: true, isMember });
  } catch (error) {
    console.error("Check membership error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update community
export const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, topic, icon } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid community ID" });
    }
    
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }
    
    // Check if user is the creator
    if (community.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the creator can edit this community" });
    }
    
    // Validate input
    if (name && (name.length < 3 || name.length > 50)) {
      return res.status(400).json({
        success: false,
        message: "Community name must be between 3 and 50 characters",
      });
    }
    
    if (description && (description.length < 10 || description.length > 500)) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 10 and 500 characters",
      });
    }
    
    // Update community
    const updatedCommunity = await Community.findByIdAndUpdate(
      id,
      { 
        ...(name && { name: name.trim() }),
        ...(description && { description: description.trim() }),
        ...(topic && { topic }),
        ...(icon && { icon })
      },
      { new: true, runValidators: true }
    ).populate("uploadedBy", "name email profilePic")
     .populate("joinedUsers", "name email profilePic");
    
    res.json({
      success: true,
      message: "Community updated successfully",
      community: updatedCommunity
    });
  } catch (error) {
    console.error("Update community error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete community
export const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid community ID" });
    }
    
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }
    
    // Check if user is the creator
    if (community.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the creator can delete this community" });
    }
    
    // Remove community from all users' joinedCommunities
    await User.updateMany(
      { joinedCommunities: id },
      { $pull: { joinedCommunities: id } }
    );
    
    // Delete the community
    await Community.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: "Community deleted successfully"
    });
  } catch (error) {
    console.error("Delete community error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};