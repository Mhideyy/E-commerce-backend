const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema(
                                            {
                                                address:  {
                                                            type:{
                                                                street: String,
                                                                city: String,
                                                                state: String,
                                                                postalCode: Number,
                                                                country: String,
                                                            },
                                                            required: true
                                                            },

                                                totalAmount:{
                                                     type: Number,
                                                     required: true
                                                 }, 

                                                paymentStatus: {
                                                                    type: String,
                                                                    enum: ["Unpaid", "Paid", "Cancelled"],
                                                                    default: "Unpaid",
                                                                    required: true
                                                },
                                                            
  
                                                status: {
                                                                    type: String,
                                                                    enum: ["Pending", "Shipped", "Delivered"],
                                                                    default: "Pending",
                                                                    required: true
                                                                },


                                                cartId: {
                                                                    type: mongoose.Types.ObjectId,
                                                                    required: true,
                                                                    ref: "Cart"
                                                                },

                                                

                                                creatorId: {
                                                                type: mongoose.Types.ObjectId,
                                                                required: true,
                                                                ref: "User"
                                                }, 
                                            
                                            },
                                            { timestamps: true }
                                        );

const ordersModel = mongoose.model("Orders", ordersSchema);

module.exports = ordersModel;