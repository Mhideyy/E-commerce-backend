const transModel = require('../models/transaction');
const ordersModel = require('../models/orders');
const userModel = require('../models/user')
const schedule = require("node-schedule");




const createTrans = async () => {
    try{
            const orderIds = await ordersModel.find({ paymentStatus: "Paid" });
            const existingTransaction = await transModel.findOne({ orderId: { $in: orderIds } });
            if(existingTransaction){
                return;
            }else{
                orderIds.forEach(orderId => {
                            const creatorId = orderId.creatorId;
                            const order =  ordersModel.findById(orderId);
                            const product = userModel.findById(order.productId);
                            const totalAmount = order.totalAmount;
                            console.log(totalAmount)
                            const newTransaction = new transModel({ creatorId, orderId, totalAmount, product });
                            newTransaction.save();
                            console.log("Transaction created successfully")
                        }) 
                    }
        } catch (error) {
                console.log(error)}
        };

schedule.scheduleJob('* * * * *', createTrans);




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


module.exports = {  getTrans, getOnetran, updateStatus };