import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    name:{type:String,required:true},

    description:{type:String,required:true},
    description1:{type:String},
    description2:{type:String},
    description3:{type:String},
    description4:{type:String},
    
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    
    bestseller:{type:Boolean},
    stock:{
        type:Number,
        require:true,
        min:0,
        default:0 
    },
    isActive:{
        type:Boolean,
        default:true
    },
    date:{type:Number,required:true}
})

const productModel=mongoose.models.product || mongoose.model('product',productSchema);

export default productModel;