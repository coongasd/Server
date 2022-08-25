import mongoose  from "mongoose";

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    orderItems:
    [
    {
        name:{ type: String, required: true},
        qty: { type: Number, required: true},
        image:{ type: String, required: false},
        price:{ type: Number, required: true},
        product: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
    },   
    
],


    shippingAddress: {
        address: {type:String, required:false},
        city:  {type:String, required:false},
        postalCode:  {type:String, required:false},
        phoneNumber:  {type:String, required:false},
        country:  {type:String, required:false},
    },
    paymentMethod: {
        type:String,
        required: true,
        default: "Paypal",
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type:String},
        email_address: {type: String},
    },
    taxPrice: {
        type:Number,
        required: false,
        default: 0.0,
    },
    shippingPrice: {
        type:Number,
        required:false,
        default: 0.0,
    },
  
    totalPrice: {
        type: Number,
        required: false,
        default: 0.0,

    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt :{
        type: Date,
    },
    isDelivered: {
        type:Boolean,
        required: true,
        default:false,
    },
    deliveredAt: {
        type: Date,
    },
},
{
    timestamps: true,
},
)
    const Order = mongoose.model("Order", orderSchema);

    export default Order;