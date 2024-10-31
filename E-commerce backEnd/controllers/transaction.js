const transModel = require('../models/transaction');

const createTrans = async (req, res) => {
    const { creatorId, ...others } = req.body;
    const { id } = req.user;
    const { role } = req.user;

    const newOrder = new transModel({ creatorId: id, ...others });
    try {
        if( role !== "Admin"){
            return res
                        .status(404)
                        .json({ message: "action not authorized reach out to the Admin"})
        }       
         await newOrder.save();    
        return res
                    .status(200)
                    .json({ message: "Transaction made successfully"})     
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!" });
    }
};


const getTrans = async (req, res) => {
    
    try {
        const transactions = await transModel.find().populate({ path: "orderId", select: "quantity status"}).populate({ path: "productId", select: "productName"});
        return res
        .status(200)
        .json(transactions);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});   
    }
}

const getOnetran = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await transModel.findById(id).populate({ path: "orderId", select: "quantity status"});
        return res
        .status(200)
        .json(transaction);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
};

const updateStatus = async (req, res)=> {
    const {id, status} = req.body;

    const { role} = req.user;
    if( role !== "Admin"){
        return res
                    .status(404)
                    .json({ message: "action not authorized reach out to the Admin"})
    }
    try {
        const transaction = await transModel.findById(id);

                if(!transaction){
                    return res
                                .status(404)
                                .json({message: "product not found"})
                }
        await transModel.findByIdAndUpdate(id, {status}, {new:true});
        return res
                    .status(200)
                    .json({ message: "status update successfully"})
        
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
}


module.exports = { createTrans, getTrans, getOnetran, updateStatus };