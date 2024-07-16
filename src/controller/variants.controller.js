const Variants = require("../modal/variants.modal");
const fileupload = require("../utilse/cloudinary");

const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find()
        console.log(variant);


        if (!variant || variant.length === 0) {
            res.status(404).json({
                success: false,
                message: "variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant data fetched",
            data: variant,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Variant Data fetched",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}
// const addVariant = async (req, res) => {
//     // console.log("llllllllllllllll", req.body);
//     // console.log(req.body);
//     // console.log(req.file);

//     const fileRes = await fileupload(req.file.path, "Variant");
//     console.log(fileRes);

//     try {
//         const variant = await Variants.create({
//             ...req.body,
//             variant_image: {
//                 public_id: fileRes.public_id,
//                 url: fileRes.url
//             }
//         });

//         if (!variant) {
//             res.status(400).json({
//                 success: false,
//                 message: 'variant not created.'
//             })
//         }

//         res.status(201).json({
//             success: true,
//             message: 'variant created successfully.',
//             data: variant
//         })



//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error.' + error.message
//         })
//     }
// }

const addVariant = async (req, res) => {
    console.log("abc", req.files);
    console.log("fdd", req.body);
    let allFiles = [];
    if (req.files) {
        await Promise.all(
            req.files.map(async (file) => {
                const uploadedFile = await fileupload(file.path, "Variants");
                allFiles.push(uploadedFile); 
            })
        );
    }
    console.log("req.file", req.files);
    console.log("all  files", allFiles);
    const img = allFiles.map((file) => {
        return {
            public_id: file.public_id,
            url: file.url
        }
    })

    console.log("qwert", img);
    try {
        const variant = await Variants.create({ ...req.body, variant_image: img });
        if (!variant) {
            res.status(400).json({
                success: true,
                message: "failed to added variant",
                data: variant,
            });
        }
        res.status(201).json({
            success: true,
            message: "variant added successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const updateVariant = async (req, res) => {
    const variantId = req.params.variant_id;

    if (!variantId) {
        return res.status(400).json({
            success: false,
            message: 'Variant ID is required.'
        });
    }

    if (req.file) {
        console.log("New image.");

        try {
            const fileRes = await fileupload(req.file.path, "Variant");
            console.log(fileRes);

            const updatedVariantData = {
                ...req.body,
                variant_image: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            };

            const variant = await Variants.findByIdAndUpdate(variantId, updatedVariantData, { new: true, runValidators: true });

            if (!variant) {
                return res.status(400).json({
                    success: false,
                    message: 'Variant not updated.'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Variant updated successfully.',
                data: variant
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error. ' + error.message
            });
        }
    } else {
        console.log("Old image.");

        try {
            const variant = await Variants.findByIdAndUpdate(variantId, req.body, { new: true, runValidators: true });
            console.log(variant);

            if (!variant) {
                return res.status(400).json({
                    success: false,
                    message: 'Variant not updated.'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Variant updated successfully.',
                data: variant
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error. ' + error.message
            });
        }
    }
};

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);

        if (!variant) {
            res.status(404).json({
                success: false,
                message: "variant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports = {
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant
}
