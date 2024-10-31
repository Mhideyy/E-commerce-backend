const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    const {password, role, ...others} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({ ...others, password:hashedPassword });
    try {
     await newUser.save();
     res
        .status(200)
        .json({ message: "PROFILE CREATED SUCCESFULLY"});
    } catch (error) {
        res
            .status(500)
            .json({ message: "sorry!!! something went wrong"});
    }
};

const loginUser = async (req, res) => {
    const { email, password} = req.body;
        try {
            const userInfo = await userModel.findOne({ email });
            if(!userInfo){
                    return res
                                .status(404)
                                .json({ messgae: "Wrong Credentials"});
                };
                const verify = bcrypt.compareSync(password, userInfo.password);
            if(!verify){
                return res
                            .status(404)
                            .json({ message: "wrong credentials" });
                };
            const aboutUser = {id: userInfo.id, role: userInfo.role};
            const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
            return res
                .cookie("user_token", token)
                .status(200)
                .json({ message: "user loggedin successfully"});        
        } catch (error) {
            res
                .status(500)
                .json({ message: "Something went wrong!!!"});
        };
};

const logoutUser = async (req, res) => {
    try {
        return res
                    .clearCookie('user_token')
                    .status(200)
                    .json({ message: "user logged out successfully!!!"})
    } catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong!!!"});
    };
};

const oauthRegister = async (req, res) => {
    const { username, email, gender, fullname } = req.body;
    try {
        const checkEmail = await userModel.findOne({email});
        if(checkEmail){
                const aboutUser = {id: checkEmail.id, role: checkEmail.role};
                const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
                res
                    .cookie("user_token", token)
                    .status(200)
                return res
                            .status(200)
                            .json({ message: "user loggedin successfully"});        
            };

            const newUser = new userModel({ username, email, gender, fullname, credentialAcct: false});
            const savedUser = await newUser.save();
            const aboutUser = {id: savedUser.id, role: savedUser.role};
            const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
            return res
                .cookie("user_token", token)
                .status(200)
                .json({ message: "user loggedin successfully"});          
        } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
}



module.exports = { createUser, loginUser, logoutUser, oauthRegister };