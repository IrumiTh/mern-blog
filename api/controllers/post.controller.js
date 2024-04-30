import Post from "../models/post.model.js";
import { errorHander } from "../utiles/error.js"

export const create = async (req, res, next) =>{
    console.log(req.body);
    if(!req.user.isAdmin){
        return next(errorHander(403, 'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHander(400, 'Please provide all required fildes'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    } catch (error) {
        next(error);
    }

}