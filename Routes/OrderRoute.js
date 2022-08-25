import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose'
import protect from "../Middware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
const orderRoute = express.Router();
//create order
orderRoute.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const { 
            orderItems, 
            
            shippingAddress,
             paymentMethod, 
             itemsPrice, 
              phoneNumber } = req.body;

              if(orderItems && orderItems.length === 0){
                    res.status(400)
                    throw new Error("Không tồn tại");
            } else { 
                const order = new Order({orderItems,
                    user:req.user._id, 
                    shippingAddress,
                     paymentMethod, 
                     itemsPrice, 
                      phoneNumber

                })
                const createOrder = await order.save();
                res.status(201).json(createOrder);
            }   
    
    })
    );
    orderRoute.get(
        "/all",
        
        asyncHandler(async (req, res) => {
            const orders = await Order.find({    }).sort({_id :1}).populate("user", "id name email")
            
            res.json(orders)
        })
    );
            

  // Order da thanh toan
  orderRoute.put(
    "/:id/pay",
    asyncHandler(async (req, res) => {
        
       
          
            const order = await Order.findById(req.params.id);
  
            if(order){
                 order.isPaid = true;
                 order.paidAt = Date.now();
                 order.paymentResuld = {
                     id: req.body.id,
                     status: req.body.status,
                     update_time:req.body.update_time,
                     email_address : req.body.email_address,
                 };

                 const updateOrder = await order.save()
                 res.json(updateOrder);

              }
              
        
            
            }
));

    //get order by id
    orderRoute.get(
        "/:id",
        asyncHandler(async (req, res) => {
            const order = await Order.findById(req.params.id).populate(
                "user",
                "name email"
            )
    
                  if(order){
                        res.json(order)
                } else { 
                   
                    res.status(404)
                    throw new Error("Order Not Found");
                }   
        
        })
        );
      
        
           //xoa1 order
           orderRoute.delete(
            "/:id",
            asyncHandler(async (req, res) => {
                const result = await Order.deleteOne({_id : req.params.id})
                res.send(result);
            })
        )



//Danh dau da thanh toan

    
           
    export default orderRoute;