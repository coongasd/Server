import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";

const userRoute = express.Router();
//Login
userRoute.post(
    "/login",
    asyncHandler(async (req, res) => {
       const{email, password} = req.body
       const user = await User.findOne({email});

       if(user && (await user.matchPassword(password))){
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               isAdmin: user.isAdmin,
               token: generateToken(user._id),
               created: user.createdAt,
           });
       }
       else {
           res.status(401)
           throw new Error("Email hoặc mật khẩu không hợp lệ");
       }
    })
);

//REGISTER
userRoute.post(
    "/",
    asyncHandler(async (req, res) => {
        const{name,email, password} = req.body;
        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400)
            throw new Error("Người dùng đã tồn tại")
        }

    const user = await User.create({
        name,
        email,
        password    
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            
        });
        
    }
    else{
        res.status(400)
        throw new Error("Thông tin không hợp lệ");
    }
    })
       

);



//Profile
userRoute.get(
    "/profile",
     protect,
    asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id)
      if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            created: user.createdAt,
        })
      }else{
        res.status(401);
        throw new Error("Không tìm thấy người dùng");
      }
    })
       

);

// Update
userRoute.put(
    "/profile",
     protect,
    asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id)
      if(user) {
       user.name  = req.body.name || user.name
       user.email  = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            created: updatedUser.createdAt,
            token: generateToken(updatedUser._id),
        })
      }else{
        res.status(401);
        throw new Error("Không tìm thấy người dùng");
      }
    })
       

);

userRoute.get("/",asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
}));

export default userRoute;