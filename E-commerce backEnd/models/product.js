const  mongoose = require('mongoose');

const productSchema = new mongoose.Schema( 
                                            {
                                                productName: {
                                                                type: String,
                                                                required: true
                                                }, 

                                                productImage: {
                                                                type: String,
                                                                required: true
                                                }, 

                                                category: {
                                                                type: String,
                                                                required: true
                                                }, 

                                                productDescription: {
                                                                type: String,
                                                                required: true
                                                }, 

                                                creatorId: {
                                                                type: mongoose.Types.ObjectId,
                                                                required: true,
                                                                ref: "User"
                                                }, 

                                                Amount: {
                                                                type: Number,
                                                                required: true
                                                }, 

                                                likes: { 
                                                                type: [mongoose.Types.ObjectId],
                                                                default: [],
                                                                ref:"User"
                                                },


                                                Status: {
                                                                type: String,
                                                                enun: [ "Available", "Out of stock"],
                                                                default: "Available"
                                                }, 
                                            },
                                            { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;