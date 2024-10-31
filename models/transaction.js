const mongoose = require('mongoose');

const transSchema = new mongoose.Schema(
                                            {
                                                creatorId: {
                                                            type: mongoose.Types.ObjectId,
                                                            required: true,
                                                            ref: "User"
                                                        },

                                                orderId: {
                                                            type: mongoose.Types.ObjectId,
                                                            required: true,
                                                            ref: "Orders"
                                                        },

                                                status: {
                                                            type: String,
                                                            required: true,
                                                            enum: ["pending", "successful", "failed"],
                                                            default: "pending"
                                                        }
                                            },
                                            { timestamps: true}
                                        );
const transModel = mongoose.model('Trans', transSchema);

module.exports = transModel;