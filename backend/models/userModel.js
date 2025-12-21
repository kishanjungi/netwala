import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:function () {
      return !this.isGoogleUser;
    }},
    cartData:{type:Object,default:{}},

    isGoogleUser: {
    type: Boolean,
    default: false
  }
},{minimize:false}) 

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;