import express from 'express';
import User from './Models/UserModel.js';
import users from './data/User.js';
import Product from './Models/ProductModel.js';
import products from './data/data.js';
import asyncHandler from 'express-async-handler';
// them du lieu vao database
const ImportData = express.Router()

ImportData.post("/user", asyncHandler(
    async (req,res) => {
        await User.remove({})
        const importUser = await User.insertMany(users)
        res.send({importUser});
    }
)
);


ImportData.post("/product", asyncHandler(
    async (req,res) => {
        await Product.remove({})
        const importProducts = await Product.insertMany(products)
        res.send({importProducts});
    }
)
);

export default ImportData;