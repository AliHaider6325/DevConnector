import express from 'express'
import connectDB from './config/db.js';
import userRoute from './routes/api/user.js';
import authRoute from './routes/api/auth.js';
import postRoute from './routes/api/post.js';
import profileRoute from './routes/api/profile.js';

const app=express();

//Connecting DB
connectDB();

app.use(express.json({extended:false}))

app.get('/',(req,res)=>{
    res.send('Api Runnning')
})
// Define route 
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/profile',profileRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`)) 