
import userModel from '../models/userModel.js'; // adjust path if needed

const allusers = async (req, res) => {
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


const deleteuser= async (req,res)=>{
  try{
    await userModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"User Deleted..." })


  }catch(err){
    console.log("user cant delete",err);
    res.status(500).json({
      success:false,
    message:'Failed to Delete the user'   
   })
  }
}
export{
   allusers,
    deleteuser
}