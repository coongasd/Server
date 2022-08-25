import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middware/AuthMiddleware.js";
import Product from "./../Models/ProductModel.js";


const productRoute = express.Router();

//them san pham
productRoute.post(
    "/",
    asyncHandler(async (req, res) => {

        const {name, img, price , tinhNang : {
            tinhNang1,tinhNang2,tinhNang3,tinhNang4
        },imgSlide : {
                      img1,
                    img2,
                    img3,
                     img4
        }, detail:{
            manHinh,
            cameraSau,
            cameraSelfie,
            CPU,
            BoNhoTrong
        },
        countInStock
    } = req.body;
    const productExist = await Product.findOne({name});
    if(productExist) {
        res.status(400);
        throw new Error("Sản phẩm đã tồn tại");
    }
    else{
        const product = new Product({
            name,
            img,
            price,
            tinhNang : {
                tinhNang1,tinhNang2,tinhNang3,tinhNang4
            },
            imgSlide : {
                img1,img2,img3,img4
             },
             detail:{
                manHinh,
                cameraSau,
                cameraSelfie,
                CPU,
                BoNhoTrong
            },
            countInStock
           
        });
        if(product){
            const createProduct = await product.save();
            res.status(201).json(createProduct)
        }
        else{
            res.status(400);
            throw new Error("Invalid product data");
        }
    }
}));
     
// lấy tất cả sản phẩm
productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const keyword = req.params.keyword ? {
            name:{
                $regex: req.query.keyword,
                $options: "i"
            }
        }
        :{

        };
        const products = await Product.find(  {...keyword}  );
        res.json(products);
    })
);

// lấy từng sản phẩm
productRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm");
        }   
    })
);


       // Xóa sa3n pham
       productRoute.delete(
        "/:id",
        asyncHandler(async (req, res) => {
            const result = await Product.deleteOne({_id : req.params.id})
            res.send(result);
        })
    )

    //edit 
    productRoute.put(
        "/:id",
        asyncHandler(async (req, res) => {
    
            const {name, img, price , tinhNang : {
                tinhNang1,tinhNang2,tinhNang3,tinhNang4
            },imgSlide : {
                          img1,
                        img2,
                        img3,
                         img4
            }, detail:{
                manHinh,
                cameraSau,
                cameraSelfie,
                CPU,
                BoNhoTrong
            },
            countInStock
        } = req.body;
        const product = await Product.findById(req.params.id);
        if(product) {
            product.name = name,
            product.img = img,
            product.price = price,
            product.tinhNang.tinhNang1 = tinhNang1,product.tinhNang.tinhNang2 = tinhNang2,product.tinhNang.tinhNang3 = tinhNang3,product.tinhNang.tinhNang4 = tinhNang4
            product.imgSlide.img1 = img1,product.imgSlide.img2 = img2,product.imgSlide.img3 = img3,product.imgSlide.img4 = img4,
            product.detail.manHinh = manHinh,
            product.detail.cameraSau = cameraSau,
            product.detail.cameraSelfie = cameraSelfie,
            product.detail.CPU = CPU,
            product.detail.BoNhoTrong = BoNhoTrong,
            product.countInStock = countInStock

            const updatedProduct = await product.save();
                res.status(201).json(updatedProduct)
        }
        else{
            res.status(404);
            throw new Error("product not found");
        }
    }));

    
export default productRoute