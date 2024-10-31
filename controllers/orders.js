const ordersModel = require('../models/orders');

const createOrder = async (req, res) => {
    const { creatorId, ...others } = req.body;
    const { id } = req.user;

    const newOrder = new ordersModel({ creatorId: id, ...others });
    try {
        await newOrder.save();    
         res
                    .status(200)
                    .json({ message: "order made successfully"});
                    
        } catch (error) {
        res
        .status(500)
        .json({ message: error.message });
    }
};



const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
    const {id} = req.user;
    try {
            const findOrder = await ordersModel.findById(orderId);
            if(findOrder.creatorId.toString() !== id){
                return res
                .status(404)
                .json({ message: "not authorized"})
            }

        await ordersModel.findByIdAndDelete(orderId);
        return res
        .status(200)
        .json({ message: "Order deleted successfully"});

    } catch (error) {
        res
        .status(500)
        .json({ message: error.message});
    }
}

const getOrder = async (req, res) => {
    
    try {
        const order = await ordersModel.find().populate({ path: "cartId", select: "productId"});
        return res
        .status(200)
        .json(order);
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message});   
    }
}

const getOneOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const oneOrder = await ordersModel.findById(id).populate({ path: "productId", select: "productName productImage"});
        return res
        .status(200)
        .json(oneOrder);
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
        const post = await ordersModel.findById(id);

                if(!post){
                    return res
                                .status(404)
                                .json({message: "product not found"})
                }
        await ordersModel.findByIdAndUpdate(id, {status}, {new:true});
        return res
                    .status(200)
                    .json({ message: "status update successfully"})
        
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
}

module.exports = { createOrder, deleteOrder, getOrder, getOneOrder,updateStatus };