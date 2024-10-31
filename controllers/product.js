const productModel = require('../models/product');

const createProductPost = async (req, res) => {
    const { creatorId, ...others} = req.body;
    const {id, role} = req.user;
        if( role !== "Admin"){
            return res
                        .status(404)
                        .json({ message: "action not authorized reach out to the Admin"})
        }
    const madeProduct = new productModel({ ...others, creatorId: id });
    try {
        await madeProduct.save();
        return res
                    .status(200)
                    .json({ message: "product post made successfully!!!"});
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
};


const viewProductPost = async (req, res) => {
    try {
        const productPost = await productModel.find();
        return res
                    .status(200)
                    .json(productPost)
    } catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong!!!"});   
    }
};

const viewOneProductPost = async (req, res) => {
    const { id } = req.params;
    try {
        const onePost = await productModel.findById(id);
        res
            .status(200)
            .json(onePost)
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message});   
    }
};

const updateProductPost = async (req, res) => {
    const { productId, ...others} = req.body;
    const {id} = req.user;
    const {role} = req.user;
    if( role !== "Admin"){
        return res
                    .status(404)
                    .json({ message: "action not authorized reach out to the Admin"})
    }
    const post = await productModel.findById(productId);

        if(post.creatorId.toString() !== id){
            return res
                        .status(404)
                        .json({ message: "not authorized"})
        };
    try {
        await productModel.findByIdAndUpdate( productId,{...others}, {new:true});
        return res
                    .status(200)
                    .json({ message: "product post updated successfully"});
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
};

const updateStatus = async (req, res)=> {
    const {id} = req.body;

    const { role} = req.user;
    if( role !== "Admin"){
        return res
                    .status(404)
                    .json({ message: "action not authorized reach out to the Admin"})
    }
    try {
        const post = await productModel.findById(id);

                if(!post){
                    res
                                .status(404)
                                .json({message: "product not found"})
                
        await productModel.findByIdAndUpdate(id, {status: "Out of stock"}, {new:true});
        return res
                    .status(200)
                    .json({ message: "status update successfully"})
        };
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
}

const likePost = async (req, res) => {
    const {productId} = req.body;
    const {id} = req.user;
    try {
        const post = await productModel.findById(productId);
        const gottenLikes = post.likes;
        const checkLike = gottenLikes.includes(id);
            if(!checkLike){
                gottenLikes.push(id);
            }else {
                const getIndex = gottenLikes.indexOf(id);
                gottenLikes.slice(getIndex, 1);
            };
    
      
            await productModel.findByIdAndUpdate(productId, {likes: gottenLikes}, {new:true});
            return res
                        .status(200)
                        .json({ message: "Like updated successfully"});
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message});
    }
};


const deleteProductPost = async (req, res) =>{
    const {productId} = req.body;
    const {id} = req.user;
    try {
        const findPost = await productModel.findById(productId)
            if(findPost.creatorId.toString() !== id){
                return res
                            .status(200)
                            .json({ message: "action not authorized"});
            };
            
        await productModel.findByIdAndDelete(productId);
        return res
                    .status(200)
                    .json({ message: "post deleted successfully"});
        
    } catch (error) {
        res
        .status(500)
        .json({ message: "Something went wrong!!!"});
    }
};

// const searchPost = async (req, res) => {
//     const { category } = req.query.q;
//     try {
//         const searchResult = await productModel.find({productName: new RegExp(category, 'i')});
//         return res
//                    .status(200)
//                    .json(searchResult);
//     } catch (error) {
//         res
//        .status(500)
//        .json({ message: "Something went wrong!!!"});
//     }
// }

module.exports = { createProductPost, viewProductPost, viewOneProductPost, updateProductPost, likePost, deleteProductPost, updateStatus }