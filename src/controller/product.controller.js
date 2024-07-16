const upload = require("../middleware/upload");
const Products = require("../modal/products.modal");
const SubCategories = require("../modal/subcategories.modal");
const fileupload = require("../utilse/cloudinary");

const listProduct = async (req, res) => {
    try {
        const listProducts = await Products.find();

        console.log(Products);
        if (!listProducts || listProducts.length === 0) {
            res.status(404).json({
                success: false,
                message: "products not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "products found",
            data: listProducts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        });
    }
}

const addProduct = async (req, res) => {
    console.log("adddddd", req.body);
    console.log(req.file);
    try {


        const fileres = await fileupload(req.file.path, "Productimg");
        console.log(fileres);

        const newproduct = await Products.create({
            ...req.body,
            pro_img: {
                public_id: fileres.public_id,
                url: fileres.url
            }
        });

        if (!newproduct) {
            res.status(400).json({
                success: false,
                message: "failed to added category"
            });
        }
        res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: newproduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    console.log("update", req.body, req.file);
    try {
        if (req.file) {
            console.log("New File upload");
            const fileres = await fileupload(req.file.path, "Productimg");
            console.log(fileres);

            const updatedproduct = await Products.findByIdAndUpdate(
                req.params.product_id,
                {
                    ...req.body,
                    pro_img: {
                        public_id: fileres.public_id,
                        url: fileres.url
                    }
                },
                { new: true, runValidators: true }
            );

            console.log("updata",updatedproduct);

            if (!updatedproduct) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });
            }

            res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: updatedproduct,
            });

        } else {
            console.log("Old file, not to upload");

            const updatedproduct = await Products.findByIdAndUpdate(req.params.product_id, req.body,
                { new: true, runValidators: true }
            );

            if (!updatedproduct) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });
            }

            res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: updatedproduct,
            });
        }
        // // const updatedproduct = await Products.findByIdAndUpdate(req.params.product_id, req.body,
        // //     { new: true, runValidators: true }
        // // );

        // if (req.file) {
        //     proRes = await fileupload(req.file.path

        //     )
        // }

        // const  updatedproduct = await Products.findById(req.params.product_id);



        // if (req.files && req.files.image) {
        //     const result = await fileupload.uploader.upload(req.files.image.path);
        //     updateData.image = result.secure_url;
        // }

        // if (!updatedproduct) {
        //     res.status(404).json({
        //         success: false,
        //         message: "Category not found",
        //     });
        // }

        // res.status(200).json({
        //     success: true,
        //     message: "Category updated successfully",
        //     data: updatedproduct,
        // });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteproduct = await Products.findByIdAndDelete(req.params.product_id);

        if (!deleteproduct) {
            res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: deleteproduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const getProductscategories = async (req, res) => {
    try {
      const subcategoriesdata = await SubCategories.aggregate(
        [
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "Product"
              }
            },
            {
              $group: {
                _id: "$_id",
                countProduct: {
                  $sum: 1
                }
              }
            }
          ]
      );
  
      res.status(200).json({
        success: true,
        message: "Subcategories with most products",
        data: subcategoriesdata
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message
      });
    }
};
 
module.exports = { listProduct, addProduct, updateProduct, deleteProduct,getProductscategories }