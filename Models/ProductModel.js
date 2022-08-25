import mongoose  from "mongoose";

const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        required: false,
        default: 0
    },
    comment:{
        type:String,
        require:true
    },
    users:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }

})

const productSchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true,

    },
    price:{
        type:Number,
        require:true,
    },
    tinhNang:{
        type:Object,
        required: true,
    },
    imgSlide:{
        type:Object,
        required:false,
    },
    detail:{
        type: Object,
        required:false
    },
    countInStock:{
        type: Number,
        required: false
    },
    rating:{
        type:Number,
        required: false,
        default: 0
    },
    numReviews:{
        type:Number,
        required: false,
        default: 0
    },
    reviews:[reviewSchema]

},
{
    timestamps:true
}
)
    const Product = mongoose.model("Product", productSchema);
    export default Product