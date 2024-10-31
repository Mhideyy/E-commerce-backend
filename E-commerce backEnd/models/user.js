const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema(
                                        {
                                            fullname: {
                                                        type: String,
                                                        required: true
                                            },
                                            username: {
                                                        type: String,
                                                        required: true
                                            },
                                            email: {
                                                        type: String,
                                                        unique: true,
                                                        required: true
                                            },
                                            password: {
                                                        type: String
                                            },
                                            gender: {
                                                        type: String,
                                                        required: true,
                                                        enum: ["Male", "Female", "Rather Not Say"]
                                            },
                                            role: {
                                                        type: String,
                                                        enum: ["Basic", "Admin"],
                                                        default: "Basic"
                                            },
                                            credentialAcct: {
                                                        type: Boolean,
                                                        default: true
                                            },
                                        },
                                            { timestamps: true },
);

const userModel =  mongoose.model('User', userSchema);

module.exports = userModel;