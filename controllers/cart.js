const cartModel = require('../models/cart');
const productModel = require('../models/product');

const addToCart = async (req, res) => {
    const { productId, ...others } = req.body;

    const { id } = req.user;
    try {
    const findProduct = await productModel.findById(productId);
    if(findProduct){
        
    }
        const newCart = new cartModel({ creatorId: id, productId, ...others });
                await newCart.save();
                res
                            .status(200)
                            .json({ message: "Cart created successfully"});

        
         } catch (error) {
        res
        .status(500)
        .json({ message: "something went wrong!!!"});
        console.log(error)
         }
        };

const editCart = async (req, res) => {
    const { cartId, ...others } = req.body;
    const {id} = req.user;
    try {
        const findCart = await cartModel.findById(cartId);
            if(findCart.creatorId.toString() !== id){
                return res
                .status(404)
                .json({ message: "not authorized"})
            }
        
            await cartModel.findByIdAndUpdate( cartId, {...others}, {new: true})
            return res
            .status(200)
            .json({ message: "Cart updated successfully"});
    } catch (error) {
         res
                .status(500)
                .json({ message: "Something went wrong!!!"});
            }
        };

const getCart = async (req, res) => {
    
    try {
        const cart = await cartModel.find().populate({ path: "productId", select: "productName Amount productDescription productImage"});
            return res
                .status(200)
                .json(cart);
    } catch (error) {
                res
                .status(500)
                .json({ message: error.message});   
            }
        }
        
const getOneCart = async (req, res) => {
            const {id} = req.params;
            try {
                const oneCart = await cartModel.findById(id).populate({ path: "productId", select: "productName productImage"});
                return res
                .status(200)
                .json(oneCart);
            } catch (error) {
                res
                .status(500)
                .json({ message: "Something went wrong!!!"});
            }
        };


const deleteCart = async (req, res) => {
    const { cartId } = req.body;
    const {id} = req.user;
        try {
                const findCart = await cartModel.findById(cartId);
                if(findCart.creatorId.toString() !== id){
                    return res
                    .status(404)
                    .json({ message: "not authorized"})
                }
    
        await cartModel.findByIdAndDelete(cartId);
            return res
            .status(200)
            .json({ message: "cart deleted successfully"});
    } catch (error) {
        res
        .status(500)
        .json({ message: 'Something went wrong!!!' });  
    }
}

module.exports = { addToCart, deleteCart, editCart, getOneCart, getCart };