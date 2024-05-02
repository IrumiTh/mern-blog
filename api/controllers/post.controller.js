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

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const post = await Post.find({
            ...(req.query.userId && { userId: req.query.userId}),
            ...(req.query.category && { category: req.query.category}),
            ...(req.query.slug && { category: req.query.slug}),
            ...(req.query.postId && { _id: req.query.postId}),
            ...(req.query.searchTerm && {
                    $or: [
                        { title: {$regex: req.query.searchTerm, $options: 'i'}},
                        { content: {$regex: req.query.searchTerm, $options: 'i'}},
                    ]
            })
        }).sort({opdatedAt: sortDirection}).skip(startIndex).limit(limit);
        const totalPost = await Post.countDocuments();
        const now=new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        });
        res.status(200).json({
            post,
            totalPost,
            lastMonthPosts
        })
    } catch (error) {
        next(error)
    }
};
export const deletepost = async (req,res,nexr)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHander(403, 'you are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted')
    } catch (error) {
        next(error);
    }
}