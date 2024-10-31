const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
                                            {
                                                productId: {
                                                                                type: mongoose.Types.ObjectId,
                                                                                required: true,
                                                                                ref: "Product"
                                                                            },
                                                                        
                                                quantity: {
                                                                                type: Number,
                                                                                default: 1
                                                                        },


                                                        
                                                 creatorId: {
                                                     type: mongoose.Types.ObjectId,
                                                     required: true,
                                                     ref: "User"
                                                 }
                        
                                             },
                                             { timestamps: true}
                                            
                                        );

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;