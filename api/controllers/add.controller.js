import Add from "../models/add.model.js";
import { errorHander } from "../utiles/error.js"

export const create = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHander(403,'You are not allowed to create a add'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHander(400, 'Please provide all the fileds'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    const newAdd = new Add({
        ...req.body, slug, userId: req.user.id
    });
    try{
        const savedAdd = await newAdd.save();
        res.status(201).json(savedAdd);
    }catch(error){
        next(error)
    }
}

export const getLastAdd = async (req, res, next) => {
    try {
        const lastAdd = await Add.findOne().sort({createdAt: -1});
        if(!lastAdd){
            return next(errorHander(404, 'No Add found'))
        }
        res.status(200).json(lastAdd);
    } catch (error) {
        next(error)
    }
}

export const getAdds = async (req, res, next) => {

    try {
        const adds = await Add.find({
            ...(req.query.addId && { _id: req.query.addId}),
        }).sort({createdAt: -1});
        if(!adds){
            return next(errorHander(404, 'No Add found'))
        }
        res.status(200).json(adds);
    } catch (error) {
        next(error)
    }
}
export const deleteadd = async (req,res,nexr)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHander(403, 'you are not allowed to delete this post'));
    }
    try {
        await Add.findByIdAndDelete(req.params.addId);
        res.status(200).json('The add has been deleted')
    } catch (error) {
        next(error);
    }
}

export const updateadd = async(req, res, next) =>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHander(403,'You are not allowed to update this post'))
    }
    try {
        const updatedAdd = await Add.findByIdAndUpdate(
            req.params.addId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                }
            },{new: true}
        )
        res.status(200).json(updatedAdd)
    } catch (error) {
        next(error)
    }
}