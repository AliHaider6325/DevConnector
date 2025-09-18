import express from 'express'

const router = express.Router();

// route:Get api/post
//desc:Test route
//access:Public

router.get('/',(req,res)=>{
    res.send('post route')
})

export default router;