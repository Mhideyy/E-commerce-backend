const bcrypt = require('bcryptjs');
const userModel = require('../models/user')

const updatePassword = async (req, res) =>{
    const {oldPassword, newPassword} = req.body;
    const{ id } = req.user;

    try {
        const getUser = await userModel.findById(id);
        const userPassword = bcrypt.compareSync( oldPassword, getUser.password);
            if(!userPassword){
                return res
                            .status(404)
                            .json({ message: "password does not match"})
            };
            if(oldPassword === getUser.password){
                return res
                            .status(400)
                            .json({ message: "new password cant be the same as old"});
            };
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
            await userModel.findByIdAndUpdate( id, {password:hashedPassword}, {new:true});
            return res
                        .status(200)
                        .json({ message: "password updated successfully"})
    } catch (error) {
        res 
            .status(500)
            .json({ message: "Something went wrong!!!"});
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.user;
    try {
        await userModel.findByIdAndDelete(id);
        res
            .clearCookie("user_token")
            .status(200)
            .json({ message: "profile deleted successfully"})
    } catch (error) {
        res
        .status(500)
        .json({ message: "something went wrong!!!"});
    }
};

const updateRole = async (req, res) => {
    const { id } = req.body;
    const { role } = req.user;
        if( role !== "Admin"){
            return res
                        .status(404)
                        .json({ message: "Action not Authorized"})
        };

    try {
        await userModel.findByIdAndUpdate(id, { role: "Admin"}, {new:true});
            res
                .status(201)
                .json({ message: `${id} is now an Admin` });
            } catch (error) {
        res
            .status(500)
            .json({ message: "something went wrong!!!"})
    }
};

module.exports = { updatePassword, deleteUser, updateRole };