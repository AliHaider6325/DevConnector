import express from 'express'
import {auth} from '../../middleware/auth.js'
import {check,validationResult} from 'express-validator'
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';

const router = express.Router();

// route:Post api/post
//desc:Create a post
//access:Private

router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
   
    const user = await User.findById(req.user.id).select('-password');

    const newPost= new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })
    const post = await newPost.save();
    res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// route:GET api/post
//desc:Get all post
//access:Private

router.get('/',auth,async (req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1})
        res.json(posts)
    } catch (err) {
     console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// route:GET api/post/:id
//desc:Get post by id
//access:Private

router.get('/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }
        res.json(post)
    } catch (err) {
     console.log(err.message);
     if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
    res.status(500).send('Server Error');
    }
})


// route:DELETE api/post/:id
//desc:DELETE a post
//access:Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.deleteOne(); // modern way instead of remove()
        res.json({ msg: 'Post Removed' });

    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// route:put api/post/like/:id
//desc:like a post
//access:Private

router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //chck if post has already liked

        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length>0){
            return res.status(400).json({msg:"Post Already liked"})
        }
        post.likes.unshift({user:req.user.id})
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// route:put api/post/unlike/:id
//desc:Unlike a post
//access:Private

router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //chck if post has already liked

        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length===0){
            return res.status(400).json({msg:"Post has not yet liked"})
        }
        //get remove index

        const removeIndex =post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})



// route:Post api/post/comment/:id
//desc:comment on a post
//access:Private

router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
   
    const user = await User.findById(req.user.id).select('-password');

    const post = await Post.findById(req.params.id);

    const newComment= {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// route:DELETE api/post/comment/:id/:comment_id
//desc:delete comment on a post
//access:Private

router.delete('/comment/:id/:comment_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment =>comment.id === req.params.comment_id)

        //make sure comment exist
        if(!comment){
            res.status(404).json({msg:"Comment doesnot exist"});
        }
        //check user
        if(comment.user.toString() !== req.user.id){
            res.status(401).json({msg:"User not authorized"});

        }
         //get remove index

        const removeIndex =post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    } catch (err) { 
     console.log(err.message);
        res.status(500).send('Server Error');
    }
})


export default router;