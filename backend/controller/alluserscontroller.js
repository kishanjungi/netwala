
import userModel from '../models/userModel.js'; // adjust path if needed

export const allusers = async (req, res) => {
  try {
    // Fetch all users (excluding password for security)
    const users = await userModel.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};
